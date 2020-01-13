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

	/**
	 * Render on public area.
	 *
	 * @param array $attributes
	 * @param string $content
	 * @return string|void
	 */
	public function render_callback( $attributes = [], $content = '' ) {
	    wp_enqueue_style( 'kbl-bubble' );
		$avatar = '';
		$name   = '';
		$attributes = wp_parse_args( $attributes, [
			'name'      => '',
			'avatar'    => '',
			'position'  => 'left',
			'user'      => 0,
  			'writer'    => 0,
  			'textColor' => '',
  			'backgroundColor' => '',
		] );
		$avatar = get_avatar_url( 0, 96 );
		$name   = '';
		if ( $attributes['user'] ) {
            $user = get_userdata( $attributes['user'] );
            if ( $user ) {
                $name = get_the_author_meta( 'display_name', $user );
                $avatar = get_avatar_url( $user->ID, 96 );
            }
		} elseif ( $attributes['writer'] ) {
		    $post = get_post( $attributes['writer'] );
            if ( $post ) {
                $name  = get_the_title( $post );
                if ( has_post_thumbnail( $post ) ) {
                    $avatar = get_the_post_thumbnail_url( $post, 'thumbnail' );
                }
            }
		}
		if ( $attributes['name'] ) {
		    $name = $attributes['name'];
        }
		if ( $attributes['avatar'] ) {
		    $avatar = $attributes['avatar'];
        }
		$classes = [ 'kbl-bubble-text' ];
		if ( $attributes['backgroundColor'] ) {
			$classes[] = sprintf( 'has-%s-background-color', $attributes['backgroundColor'] );
		}
		if ( $attributes['textColor'] ) {
		    $classes[] = sprintf( 'has-%s-text-color', $attributes['textColor'] );
        }
		$content = preg_replace( '/kbl-bubble-text/u', esc_attr( implode( ' ', $classes ) ), $content );
		ob_start();
		?>
		<div class="kbl-bubble" data-position="<?php echo esc_attr( $attributes['position'] ) ?>">
			<figure class="kbl-bubble-avatar">
                <img class="kbl-bubble-image" src="<?php echo esc_url( $avatar ) ?>" alt="<?php echo esc_attr( $name ) ?>" width="96" height="96" />
                <?php if ( $name ) : ?>
                <figcaption class="kbl-bubble-name"><?php echo esc_html( $name ) ?></figcaption>
                <?php endif; ?>
            </figure>
            <?php echo $content ?>
		</div>
		<?php
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}

	protected function localize_script() {
		$virtual_member = '';
		$virtual_member_label = '';
		if ( class_exists( 'Kunoichi\VirtualMember\PostType' ) && \Kunoichi\VirtualMember\PostType::is_active() ) {
			$virtual_member = \Kunoichi\VirtualMember\PostType::post_type();
			$post_type = get_post_type_object( $virtual_member );
			if ( $post_type ) {
			    $virtual_member_label = $post_type->label;
            }
		}
		return [
			'avatar'         => get_avatar_url( 0 ),
			'size'           => apply_filters( 'kbl_avatar_size', 'thumbnail' ),
			'virtual_member' => $virtual_member,
			'virtual_member_label' => $virtual_member_label ?: __( 'Post', 'kbl' ),
		];
	}

}
