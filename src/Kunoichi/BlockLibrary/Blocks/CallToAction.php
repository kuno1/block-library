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

	protected function init() {
		parent::init();
		if ( ! $this->disabled ) {
			CallToActionPostType::get_instance();
		}
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
