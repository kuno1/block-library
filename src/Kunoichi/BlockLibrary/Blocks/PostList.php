<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

/**
 * Block library base.
 *
 * @package Kunoichi\BlockLibrary\Blocks
 */
class PostList extends BlockLibraryBase {

	protected $block_name = 'posts';

	protected function localize_script() {
		$post_types = (array) apply_filters( 'kbl_post_list_post_types', get_post_types( [
			'public' => true,
		] ) );
		$post_type_supported = [];
		foreach ( $post_types as $post_type ) {
			$object = get_post_type_object( $post_type );
			$label = __( 'Undefined Post Type', 'kbl' );
			if ( $object ) {
				$label = $object->label;
			}
			$post_type_supported[ $post_type ] = $label;
		}
		wp_localize_script( 'kbl-posts', 'KblPostList', [
			'post_types' => $post_type_supported,
			'orderby' => apply_filters( 'kbl_post_list_orders', [
				'date' => __( 'Date', 'kbl' ),
				'menu_order' => __( 'Menu Order', 'kbl' ),
				'rand' => __( 'Random', 'kbl' ),
			] ),
		] );
	}
}
