<?php

namespace Kunoichi\BlockLibrary\Rest;


use Kunoichi\BlockLibrary\Pattern\RestBase;
use Kunoichi\BlockLibrary\Pattern\TermConverter;

class Taxonomy extends RestBase {

	use TermConverter;

	protected $route = 'term/(?P<id>\d+)';

	protected function get_args( $http_method ) {
		return [
			'id' => [
				'type'              => 'integer',
				'required'          => true,
				'description'       => 'Term ID to Get',
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
		global $wpdb;
		$query = <<<SQL
			SELECT * FROM {$wpdb->terms} AS t
			INNER JOIN {$wpdb->term_taxonomy} AS tt
			ON t.term_id = tt.term_id
			WHERE t.term_id = %d
SQL;
		// phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
		$result = $wpdb->get_row( $wpdb->prepare( $query, $request->get_param( 'id' ) ) );
		if ( $result ) {
			return new \WP_REST_Response( $this->add_taxonomy_label( $result ) );
		} else {
			return new \WP_Error( 'no_term_found', __( 'No term found.', 'kbl' ) );
		}
	}

	public function permission_callback() {
		return current_user_can( 'edit_posts' );
	}
}
