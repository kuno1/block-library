<?php

namespace Kunoichi\BlockLibrary\Rest;


use Kunoichi\BlockLibrary\Pattern\RestBase;

/**
 * Search users
 *
 * @package kbl
 */
class PostSearch extends RestBase {

	protected $route = 'search/(?P<post_type>[^/]+)';

	protected function allowed_post_types() {
		$post_types = [ 'posts', 'page', 'attachment' ];
		if ( class_exists( 'Kunoichi\VirtualMember\PostType' ) && \Kunoichi\VirtualMember\PostType::is_active() ) {
			$post_types[] = \Kunoichi\VirtualMember\PostType::post_type();
		}
		return apply_filters( 'kbl_allowed_post_type_to_search', $post_types );
	}

	protected function get_args( $http_method ) {
		return [
			'post_type' => [
				'type'              => 'string',
				'default'           => 'post',
				'validate_callback' => function( $var ) {
					if ( in_array( $var, [ 'any', 'public' ], true ) ) {
						return true;
					}
					return post_type_exists( $var ) && in_array( $var, $this->allowed_post_types(), true );
				},
			],
			's'         => [
				'type'              => 'string',
				'description'       => 'Search terms for posts.',
				'validate_callback' => function( $var ) {
					return ! empty( $var );
				},
			],
			'id'        => [
				'type'              => 'integer',
				'description'       => 'ID of post.',
				'validate_callback' => [ $this, 'is_numeric' ],
			],
			'paged'     => [
				'type'              => 'integer',
				'default'           => 1,
				'validate_callback' => function( $var ) {
					return is_numeric( $var ) && 0 < $var;
				},
			],
			'number'    => [
				'type'              => 'integer',
				'default'           => 10,
				'validate_callback' => function( $var ) {
					return is_numeric( $var ) && -1 < $var;
				},
			],
		];
	}

	/**
	 * Handle GET request and do search operation.
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function handle_get( \WP_REST_Request $request ) {
		$id = $request->get_param( 'id' );
		if ( $id ) {
			// Single search.
			$args = [
				'p'              => $id,
				'posts_per_page' => 1,
			];
		} elseif ( $request->get_param( 's' ) ) {
			// Multiple search.
			$args = [
				's'              => $request->get_param( 's' ),
				'posts_per_page' => $request->get_param( 'number' ),
				'paged'          => $request->get_param( 'paged' ),
			];
		} else {
			return new \WP_Error( 'invalid_search_operation', __( 'Parameter "id" or "s" is required.', 'kbl' ), [
				'status' => 400,
			] );
		}
		$post_type = $request->get_param( 'post_type' );
		switch ( $post_type ) {
			case 'public':
				$post_types = get_post_types( [ 'public' => true ] );
				break;
			case 'any':
			default:
				$args['post_type'] = $post_type;
				break;
		}
		$args     = array_merge( $args, [
			'post_status' => 'publish',
		] );
		$args     = apply_filters( 'kbl_rest_posts_search_args', $args, $request, get_current_user_id() );
		$query    = new \WP_Query( $args );
		$result   = array_map( [ $this, 'to_array' ], (array) $query->posts );
		$result   = apply_filters( 'kbl_rest_post_response', $result, $request );
		$response = new \WP_REST_Response( $result );
		$response->set_headers( [
			'X-WP-Total' => $query->found_posts,
		] );
		return $response;
	}

	/**
	 * Convert users to array
	 *
	 * @param \WP_Post $post
	 * @return array[]
	 */
	protected function to_array( $post ) {
		return [
			'id'             => $post->ID,
			'title'          => get_the_title( $post ),
			'thumbnail'      => get_the_post_thumbnail_url( $post, 'thumbnail' ),
			'date'           => $post->post_date,
			'date_formatted' => mysql2date( get_option( 'date_format' ), $post->post_date ),
			'type'           => $post->post_type,
			'type_formatted' => get_post_type_object( $post->post_type )->labels->singular_name,
		];
	}

	/**
	 * Permission callback.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return bool
	 */
	public function permission_callback( \WP_REST_Request $request ) {
		$can = current_user_can( 'edit_posts' );
		return apply_filters( 'kbl_rest_post_search_capability', $can, get_current_user_id(), $request );
	}
}
