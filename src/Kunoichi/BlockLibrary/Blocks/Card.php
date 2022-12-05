<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

/**
 * Cards blocks.
 *
 * @package kbl
 */
class Card extends BlockLibraryBase {

	protected $block_name = 'card';

	protected function localize_script() {
		wp_localize_script( 'kbl-card', 'KblLinkCard', [
			'size'        => apply_filters( 'kbl_link_card_size', 'thumbnail' ),
			'default_src' => apply_filters( 'kbl_link_card_default_image', $this->asset_url( 'img/link-card-default.jpg' ) ),
		] );
	}


}
