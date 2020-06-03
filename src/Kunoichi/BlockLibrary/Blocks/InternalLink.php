<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class InternalLink extends BlockLibraryBase {

	protected $block_name = 'internal-link';

	private $attributes_store = [];

	protected function filter_attributes( $args ) {
		$args['attributes'] = [
			'id' => [
				'type'    => 'number',
				'default' => 0,
			],
			'title' => [
				'type'    => 'string',
				'default' => '',
			],
			'excerpt' => [
				'type'    => 'string',
				'default' => '',
			],
			'className' => [
				'type'    => 'string',
				'default' => '',
			],
		];
		return $args;
	}

	public function render_callback( $attributes = [], $content = '' ) {
		try {
			if ( ! $attributes['id'] ) {
				throw new \Exception( __( 'No post is specified.', 'kbl' ), 400 );
			}
			$query = new \WP_Query( [
				'p'              => $attributes['id'],
				'post_status'    => 'publish',
				'post_type'      => get_post_types( [ 'public' => true ] ),
				'posts_per_page' => 1,
			] );
			if ( ! $query->have_posts() ) {
				throw new \Exception( __( 'Post not found.', 'kbl' ), 404 );
			}
			$this->attributes_store = $attributes;
			add_filter( 'the_title', [ $this, 'filter_title' ], 10, 2 );
			add_filter( 'get_the_excerpt', [ $this, 'filter_excerpt' ], 10, 2 );
			ob_start();
			while ( $query->have_posts() ) {
				$query->the_post();
				if ( $template = apply_filters( 'kbl_internal_link_template', 'embed-content', $query, $attributes  ) ) {
					get_template_part( $template );
				}
				do_action( 'kbl_internal_link_display', $query, $attributes );
			}
			wp_reset_postdata();
			$content = ob_get_contents();
			ob_end_clean();
			remove_filter( 'the_title', [ $this, 'filter_title' ], 10 );
			$content = sprintf( '<div class="kbl-internal-link %s">%s</div>', esc_attr( $attributes['className'] ), $content );
			return apply_filters( 'kbl_internal_link_output', $content, $query, $attributes );
		} catch( \Exception $e ) {
			$msg = '';
			if ( $this->is_rest() ) {
				$msg = sprintf( '<div class="components-placeholder is-large">%s</div>', $e->getMessage() );
			}
			return apply_filters( 'kbl_internal_link_empty', $msg, $e->getMessage(), $e->getCode(), $attributes );
		}
	}

	/**
	 * Override post title.
	 *
	 * @param string $title
	 * @param int    $id
	 * @return string
	 */
	public function filter_title( $title, $id ) {
		if ( ( $this->attributes_store['id'] == $id ) && ( $this->attributes_store['title'] ) ) {
			$title = $this->attributes_store['title'];
		}
		return $title;
	}

	/**
	 * Override post excerpt.
	 *
	 * @param string   $excerpt
	 * @param \WP_Post $post
	 * @return string
	 */
	public function filter_excerpt( $excerpt, $post ) {
		if ( ( $this->attributes_store['id'] == $post->ID ) && ( $this->attributes_store['excerpt'] ) ) {
			$excerpt = $this->attributes_store['excerpt'];
		}
		return $excerpt;
	}
}
