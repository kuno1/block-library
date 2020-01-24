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

	public $post_type = 'call-to-action';

	protected $block_name = 'cta';

	protected function init() {
		parent::init();
		if ( ! $this->disabled ) {
			CallToActionPostType::get_instance();
		}
	}

	protected function localize_script() {
		$positions = [];
		$terms = get_terms( [ 'taxonomy' => 'cta-position', 'hide_empty' => false ] );
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


	/**
	 * Getter
	 *
	 * @param string $name
	 * @return mixed
	 */
	public function __get( $name ) {
		switch( $name ) {
			case 'post_type':
				return CallToActionPostType::get_instance();
			default:
				return null;
		}
	}
}
