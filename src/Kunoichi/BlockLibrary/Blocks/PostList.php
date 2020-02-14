<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

/**
 * Block library base.
 *
 * @package Kunoichi\BlockLibrary\Blocks
 */
class PostList extends BlockLibraryBase {

	protected $block_name = 'posts';

	protected function init() {
		parent::init();
		add_filter( 'posts_where', [ $this, 'posts_where' ], 10, 2 );
	}


	protected function filter_attributes( $args ) {
		$args[ 'attributes' ] = [
			'template' => [
				'type' => 'string',
				'default' => '',
			],
			'ids' => [
				'type' => 'string',
			],
			's' => [
				'type' => 'string',
			],
			'term_ids' => [
				'type' => 'array',
			],
			'post_type' => [
				'type' => 'string',
			],
			'number' => [
				'type' => 'integer',
			],
			'orderby' => [
				'type' => 'string',
			],
			'order' => [
				'type' => 'string',
			],
			'showMore' => [
				'type' => 'boolean',
			],
			'moreLabel' => [
				'type' => 'string',
			],
			'className' => [
				'type'    => 'string',
				'default' => '',
			],
			'ignore_sticky' => [
				'type'    => 'boolean',
				'default' => true,
			],
		];
		return $args;
	}


	protected function localize_script() {
		$post_types = (array) apply_filters( 'kbl_post_list_post_types', get_post_types( [
			'public' => true,
		] ) );
		$post_type_supported = [];
		foreach ( $post_types as $post_type ) {
			$object = get_post_type_object( $post_type );
			$label = __( 'Undefined Post Type', 'kbl' );
			if ( $object ) {
				$label = $object->label;
			}
			$post_type_supported[ $post_type ] = $label;
		}
		wp_localize_script( 'kbl-posts', 'KblPostList', [
			'templates'  => apply_filters( 'kbl_post_list_templates', [
				'' => __( 'Default', 'kbl' ),
			] ),
			'post_types' => $post_type_supported,
			'orderby'    => apply_filters( 'kbl_post_list_orders', [
				'date' => __( 'Date', 'kbl' ),
				'menu_order' => __( 'Menu Order', 'kbl' ),
				'rand' => __( 'Random', 'kbl' ),
			] ),
		] );
	}

	/**
	 * Where query for term ids.
	 *
	 * @param string $where
	 * @param \WP_Query $wp_query
	 * @return string
	 */
	public function posts_where( $where, $wp_query ) {
		$term_ids = $wp_query->get( 'term_ids' );
		if ( ! $term_ids || ! is_array( $term_ids ) ) {
			return $where;
		}
		$term_ids = array_map( 'intval', array_filter( $term_ids, 'is_numeric' ) );
		if ( ! $term_ids ) {
			return $where;
		}
		global $wpdb;
		$where_clause = implode( ',', $term_ids );
		$where .= <<<SQL
			AND (
			    {$wpdb->posts}.ID IN (
			    	SELECT DISTINCT {$wpdb->term_relationships}.object_id
			    	FROM {$wpdb->term_relationships}
			    	LEFT JOIN {$wpdb->term_taxonomy}
			    	ON {$wpdb->term_relationships}.term_taxonomy_id = {$wpdb->term_taxonomy}.term_taxonomy_id
			    	WHERE {$wpdb->term_taxonomy}.term_id IN ({$where_clause})
			    )
			)
SQL;
		return $where;
	}

	public function render_callback( $attributes = [], $content = '' ) {
		$attributes = wp_parse_args( $attributes, [
			'template'      => '',
			'ids'           => '',
			's'             => '',
			'term_ids'      => [],
			'post_type'     => 'post',
			'number'        => 5,
			'orderby'       => 'date',
			'order'         => 'DESC',
			'showMore'      => true,
			'moreLabel'     => '',
			'className'     => '',
			'ignore_sticky' => true,
		] );
		$args = [
			'post_type' => $attributes['post_type']
		];
		if ( $attributes['ids'] ) {
			$args['post__in'] = array_map( 'trim', explode( ',', $attributes['ids'] ) );
		} else {
			// Term IDs
			if ( $attributes['term_ids'] ) {
				$args['term_ids'] = $attributes['term_ids'];
			}
			// Search terms.
			if ( $attributes['s'] ) {
				$args['s'] = $attributes['s'];
			}
			// Number
			$args['posts_per_page'] = $attributes['number'];
			// Order
			$args['orderby'] = $attributes['orderby'];
			if ( 'rand' !== $attributes['orderby'] ) {
				$args['order'] = $attributes['order'];
			}
		}
		if ( $attributes['ignore_sticky'] ) {
			$args['ignore_sticky_posts'] = true;
		}
		$query = new \WP_Query( $args );
		if ( ! $query->have_posts() ) {
			if ( $this->is_rest() ) {
				$label = esc_html__( 'No Post Found', 'kbl' );
				$desc  = wp_kses_post( sprintf( __( 'Nothing matches your criteria.<br />Please change conditions.', 'kbl' ), admin_url( 'post-new.php?post_type=call-to-action' ) ) );
				return <<<HTML
					<div class="components-placeholder">
						<div class="components-placeholder__label">
							<span class="dashicons dashicons-warning"></span>
							{$label}
						</div>
						<div class="components-placeholder__fieldset">
							<p>{$desc}</p>
						</div>
					</div>
HTML;
			} else {
				return '';
			}
		}
		ob_start();
		$class_names = [ 'kbl-post-list' ];
		if ( $attributes['className'] ) {
			$class_names[] = $attributes['className'];
		}
		$class_names = apply_filters( 'kbl_post_list_class_name', $class_names, $attributes, $query );
		echo apply_filters( 'kbl_post_list_pre', sprintf( '<div class="%s">', esc_attr( implode( ' ', $class_names ) ) ), $attributes, $query );
		while ( $query->have_posts() ) {
			$query->the_post();
			$this->get_template_parts( 'post-loop', $attributes['template'] );
		}
		wp_reset_postdata();
		echo apply_filters( 'kbl_post_list_after', '</div>', $attributes, $query );
		if ( $attributes['showMore'] ) {
			$more_url = '';
			$post_type = $attributes['post_type'];
			$post_type_object = get_post_type_object( $post_type );
			if ( 'post' === $post_type ) {
				$more_url = ( $page_for_posts = get_option( 'page_for_posts' ) ) ? get_permalink( $page_for_posts ) : home_url();
			} elseif ( $post_type_object->has_archive ) {
				$more_url = get_post_type_archive_link( $post_type );
			} else {
				// No archive.
			}
			if ( $attributes['term_ids'] ) {
				foreach ( $attributes['term_ids'] as $term_id ) {
					$term = get_term( $term_id );
					if ( ! $term || is_wp_error( $term ) ) {
						continue;
					}
					$url = get_term_link( $term );
					if ( ! $url || is_wp_error( $url ) ) {
						continue;
					}
					$more_url = $url;
					break;
				}
			}
			if ( $more_url ) {
				$more_label   = $attributes['moreLabel'] ?: apply_filters( 'kbl_post_list_more_default', __( 'More', 'kbl' ) );
				$button_class = apply_filters( 'kbl_post_list_button_classes', [ 'kbl-post-list-button' ] );
				printf(
					'<div class="%1$s"><a href="%2$s" class="kbl-post-list-button-link">%3$s</a></div>',
					esc_attr( implode( ' ', $button_class ) ),
					esc_url( $more_url ),
					wp_kses_post( $more_label )
				);
			}
		}
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}
}
