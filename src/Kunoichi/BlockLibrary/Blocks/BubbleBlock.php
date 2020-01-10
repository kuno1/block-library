<?php

namespace Kunoichi\BlockLibrary\Blocks;



use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

/**
 * Bubble Block
 *
 * @package kbl
 */
class BubbleBlock extends BlockLibraryBase {

	protected $block_name = 'bubble';

	protected function localize_script() {
		$virtual_member = '';
		$virtual_member_label = '';
		if ( class_exists( 'Kunoichi\VirtualMember\PostType' ) && \Kunoichi\VirtualMember\PostType::is_active() ) {
			$virtual_member = \Kunoichi\VirtualMember\PostType::post_type();
			$post_type = get_post_type_object( $virtual_member );
			$virtual_member_label = $post_type->label;
		}
		return [
			'avatar'         => get_avatar_url( 0 ),
			'size'           => apply_filters( 'kbl_avatar_size', 'thumbnail' ),
			'virtual_member' => $virtual_member,
			'virtual_member_label' => $virtual_member_label ?: __( 'Post', 'kbl' ),
		];
	}

}
