<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class Clipboard extends BlockLibraryBase {

	protected $block_name = 'clipboard';

	protected $is_rendered = false;

	public function render_callback( $attributes, $content ) {
		wp_enqueue_script( 'kbl-components-clipboard-helper' );
		return $content;
	}
}
