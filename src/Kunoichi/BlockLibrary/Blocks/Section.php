<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class Section extends BlockLibraryBase {

	protected $block_name = 'section';

	protected function localize_script() {
		return apply_filters( 'kbl_section_container_class', [
			'container_class'    => 'kbl-section-container',
			'no_container_class' => 'kbl-section-no-container',
		] );
	}


}
