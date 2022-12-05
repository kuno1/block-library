<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;
use Kunoichi\BlockLibrary\PostTypes\CallToActionPostType;

/**
 * Call to actions
 *
 * @package kbl
 * @property-read CallToActionPostType $post_type
 */
class CallToAction extends BlockLibraryBase {

	protected $block_name = 'cta';

	protected function init() {
		parent::init();
		if ( ! $this->disabled ) {
			CallToActionPostType::get_instance();
		}
	}

	protected function localize_script() {
		$positions = [];
		$terms     = get_terms( [ 'taxonomy' => 'cta-position', 'hide_empty' => false ] );
		if ( $terms && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $term ) {
				$positions[] = [
					'label' => $term->name,
					'value' => $term->term_id,
				];
			}
		}
		$predefineds = [];
		foreach ( CallToActionPostType::get_predefined_positions() as $value => $label ) {
			$predefineds[] = [
				'label' => $label,
				'value' => $value,
			];
		}
		$orders = [];
		foreach ( CallToActionPostType::orders() as $value => $label ) {
			$orders[] = [
				'label' => $label,
				'value' => $value,
			];
		}
		wp_localize_script( 'kbl-cta', 'KblCta', [
			'positions'   => $positions,
			'predefineds' => $predefineds,
			'orders'      => $orders,
		] );
	}

	protected function filter_attributes( $args ) {
		$args['attributes'] = [
			'order'               => [
				'type'    => 'string',
				'default' => '',
			],
			'number'              => [
				'type'    => 'integer',
				'default' => 1,
			],
			'positions'           => [
				'type'    => 'array',
				'default' => [],
			],
			'predefinedPositions' => [
				'type'    => 'array',
				'default' => [],
			],
		];
		return $args;
	}


	/**
	 * @param array $attributes
	 * @param string $content
	 * @return string
	 */
	public function render_callback( $attributes = [], $content = '' ) {
		$attributes = wp_parse_args( $attributes, [
			'order'               => '',
			'number'              => 1,
			'positions'           => [],
			'predefinedPositions' => [],
		] );
		$query      = CallToActionPostType::get( [
			'position'            => $attributes['positions'],
			'order'               => $attributes['order'],
			'predefined_position' => $attributes['predefinedPositions'],
			'posts_per_page'      => $attributes['number'],
		] );
		if ( ! $query->have_posts() ) {
			if ( $this->is_rest() ) {
				$label = esc_html__( 'No Call To Action', 'kbl' );
				// translators: %s is URL.
				$desc = wp_kses_post( sprintf( __( 'Nothing matches your criteria.<br />Change condition or create <a href="%s" target="_blank">new one</a>.', 'kbl' ), admin_url( 'post-new.php?post_type=call-to-action' ) ) );
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
		while ( $query->have_posts() ) {
			$query->the_post();
			CallToActionPostType::load( 'block' );
		}
		wp_reset_postdata();
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}

	/**
	 * Getter
	 *
	 * @param string $name
	 * @return mixed
	 */
	public function __get( $name ) {
		switch ( $name ) {
			case 'post_type':
				return CallToActionPostType::get_instance();
			default:
				return null;
		}
	}
}
