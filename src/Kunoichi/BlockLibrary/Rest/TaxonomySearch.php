<?php

namespace Kunoichi\BlockLibrary\Rest;


use Kunoichi\BlockLibrary\Pattern\RestBase;
use Kunoichi\BlockLibrary\Pattern\TermConverter;

class TaxonomySearch extends RestBase {

	use TermConverter;

	protected $route = 'terms';

	protected function get_args( $http_method ) {
		return [
			's' => [
				'type' => 'string',
				'description' => 'Search string',
				'validate_callback' => function( $var ) {
					return ! empty( $var );
				},
			],
			'paged' => [
				'type' => 'integer',
				'default' => 1,
				'validate_callback' => function( $var ) {
					return is_numeric( $var );
				},
			],
		];
	}

	/**
	 * Search terms.
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function handle_get( $request ) {
		$per_page = 10;
		$s        = $request->get_param( 's' );
		$paged    = max( 1, $request->get_param( 'paged' ) );
		$offset   = ( $paged - 1 ) * $per_page;
		global $wpdb;
		$query = <<<SQL
			SELECT SQL_CALC_FOUND_ROWS * FROM {$wpdb->terms} AS t
			INNER JOIN {$wpdb->term_taxonomy} AS tt
			ON t.term_id = tt.term_id
			WHERE t.name LIKE %s
			LIMIT %d, %d
SQL;
		$query = $wpdb->prepare( $query, '%' . $s . '%', $offset, $per_page );
		$terms = $wpdb->get_results( $query );
		$response = new \WP_REST_Response( array_map( [ $this, 'add_taxonomy_label' ], $terms ) );
		$found    = $wpdb->get_var( 'SELECT FOUND_ROWS()' );
		$response->set_headers( [
			'X-WP-Total'     => $found,
			'X-WP-TotalPage' => ceil( $found / $per_page ),
		] );
		return $response;
	}

	public function permission_callback() {
		return current_user_can( 'edit_posts' );
	}
}
