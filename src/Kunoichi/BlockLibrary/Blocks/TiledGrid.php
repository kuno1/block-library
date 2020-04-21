<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class TiledGrid extends BlockLibraryBase {

	protected $block_name = 'tiled-grid';

	public function render_callback( $attributes = [], $content = '' ) {
		if ( ! is_admin() ) {
			wp_enqueue_style( 'kbl-tile-helper' );
		}
		return $content;
	}

}
