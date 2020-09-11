<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class Section extends BlockLibraryBase {

	protected $block_name = 'section';

	protected function init() {
		add_filter( 'wp_kses_allowed_html', [ $this, 'allowed_html' ], 10, 2 );
		add_filter( 'safe_style_css', [ $this, 'safe_styles' ] );
		parent::init();
	}


	protected function localize_script() {
		return apply_filters( 'kbl_section_container_class', [
			'container_class'    => 'kbl-section-container',
			'no_container_class' => 'kbl-section-no-container',
		] );
	}

	/**
	 * Render content
	 *
	 * @param array $attributes
	 * @param string $content
	 * @return string
	 */
	public function render_callback( $attributes = [], $content = '' ) {
		if ( ! empty( $attributes['more'] ) ) {
			wp_enqueue_script( 'kbl-components-section-helper' );
		}
		return $content;
	}

	/**
	 *
	 *
	 * @param array  $tags
	 * @param string $context
	 * @return array
	 */
	public function allowed_html( $tags, $context = '' ) {
		if ( ! isset( $tags['source'] ) ) {
			$tags['source'] = [
				'src'   => true,
				'type'  => true,
				'media' => true,
				'class' => true,
			];
		}
		return $tags;
	}

	/**
	 * Add allowed style tags.
	 *
	 * @param string[] $attrs
	 * @return string[]
	 */
	public function safe_styles( $attrs ) {
		$attrs[] = 'opacity';
		return $attrs;
	}
}
