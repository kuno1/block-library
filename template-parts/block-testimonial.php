<?php
/**
 * Loop item in testimonial block.
 *
 * @package kbl
 */
$position = get_post_meta( get_the_ID(), '_testimonial_position', true );
$source   = get_post_meta( get_the_ID(), '_testimonial_source', true );
$url      = get_post_meta( get_the_ID(), '_testimonial_url', true );
if ( ! $source && $url ) {
    $source = preg_replace( '#^https?://#u', '', current( explode( '/', $url ) ) );
}
?>
<div class="kbl-testimonial-item">
    <?php if ( has_post_thumbnail() ) : ?>
        <?php the_post_thumbnail( 'thumbnail', [ 'class' => 'kbl-testimonial-avatar' ] ); ?>
    <?php else : ?>
        <?php echo apply_filters( 'kbl_default_testimonial_image', get_avatar( 0, 96, '', '', [ 'class' => 'kbl-testimonial-avatar' ] ) ) ?>
    <?php endif; ?>
	<h3 class="kbl-testimonial-name">
		<?php the_title(); ?>
		<?php if ( $position ) : ?>
			<small class="kbl-testimonial-position"><?php echo esc_html( $position ) ?></small>
		<?php endif; ?>
	</h3>
	<blockquote class="kbl-testimonial-text">
		<?php the_excerpt(); ?>
        <?php if ( $source ) : ?>
		    <cite class="kbl-testimonial-source">
                <?php if ( $url ) : ?>
                    <a href="<?php echo esc_url( $url ) ?>" class="kbl-testimonial-link" target="_blank" rel="noopener noreferrer">
                        <?php echo esc_html( $source ) ?>
                    </a>
				<?php else : ?>
                    <?php echo esc_html( $source ) ?>
                <?php endif; ?>
            </cite>
		<?php endif; ?>
	</blockquote>
</div>
