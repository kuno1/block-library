<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class Step extends BlockLibraryBase {

	protected $block_name = 'step';

	/**
	 * Remove empty image div.
	 *
	 * @param array $attributes
	 * @param string $content
	 * @return string
	 */
	public function render_callback( $attributes = [], $content = '' ) {
		return str_replace( '<div class="kbl-step-images"></div>', '', $content );
	}
}
