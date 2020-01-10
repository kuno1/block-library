<?php

namespace Kunoichi\BlockLibrary\Rest;


use Kunoichi\BlockLibrary\Pattern\RestBase;

/**
 * Search users
 *
 * @package kbl
 */
class UserSearch extends RestBase {

	protected $route = 'users/(?P<context>[^/]+)';

	protected function get_args( $http_method ) {
		return [
			's' => [
				'type'              => 'string',
				'description'       => 'Search terms for users.',
				'validate_callback' => function( $var ) {
					return ! empty( $var );
				}
			],
			'id' => [
				'type' => 'integer',
				'description' => 'ID of user.',
				'validate_callback' => [ $this, 'is_numeric' ],
			],
			'context' => [
				'type'              => 'string',
				'default'           => 'search',
				'validate_callback' => function( $var ) {
					return ! empty( $var );
				}
			],
			'paged' => [
				'type' => 'integer',
				'default' => 1,
				'validate_callback' => function( $var ) {
					return is_numeric( $var ) && 0 < $var;
				},
			],
			'number' => [
				'type' => 'integer',
				'default' => 10,
				'validate_callback' => function( $var ) {
					return is_numeric( $var ) && -1 < $var;
				}
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
		if ( $id = $request->get_param( 'id' ) ) {
			$args = [
				'include'     => [ (int) $id ],
				'count_total' => false,
			];
		} elseif ( $s = $request->get_param( 's' ) ) {
			$args = [
				'search'         => '*' . $s . '*',
				'search_columns' => [ 'user_login', 'display_name', 'user_email' ],
				'number'         => $request->get_param( 'number' ),
				'paged'          => $request->get_param( 'paged' ),
			];
		} else {
			return new \WP_Error( 'invalid_search_operation', __( 'Parameter "id" or "s" is required.', 'kbl'  ), [
				'status' => 400,
			] );
		}
		$args = apply_filters( 'kbl_rest_users_search_args', $args, $request->get_param( 'context' ), get_current_user_id(), $request );
		$users = new \WP_User_Query( $args );
		$result = array_map( [ $this, 'to_array' ], (array) $users->get_results() );
		$result = apply_filters( 'kbl_rest_users_response', $result, $request->get_param( 'context' ), $request );
		$response = new \WP_REST_Response( $result );
		$response->set_headers( [
			'X-WP-Total' => $users->get_total(),
		] );
		return $response;
	}

	/**
	 * Convert users to array
	 *
	 * @param \WP_User $user
	 * @return array[]
	 */
	protected function to_array( $user ) {
		return [
			'id' => $user->ID,
			'display_name' => $user->display_name,
			'login' => $user->user_login,
			'avatar' => get_avatar_url( $user->ID ),
			'role'   => $user->roles,
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
		return apply_filters( 'kbl_rest_users_capability', $can, get_current_user_id(), $request );
	}
}
