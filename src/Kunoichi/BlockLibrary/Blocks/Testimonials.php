<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary;
use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class Testimonials extends BlockLibraryBase {

	protected $block_name = 'testimonials';

	protected function init() {
	    // Before run constructor, check if testimonial is enabled.
        if ( ! class_exists( 'Kunoichi\Testimonials\TestimonialPostType' ) || ! \Kunoichi\Testimonials\TestimonialPostType::is_active() ) {
            $this->disabled = true;
        }
		return parent::init();
	}


	protected function filter_attributes( $args ) {
		return array_merge( parent::filter_attributes( $args ), [
			'attributes' => [
				'ids' => [
					'type' => 'string',
					'default' => '',
				],
				'order' => [
					'type' => 'string',
					'default' => 'latest',
				],
				'number' => [
					'type' => 'integer',
					'default' => 5,
				],
			],
		] );
	}

	public function render_callback( $attributes = [], $content = '' ) {
	    $attributes = wp_parse_args( $attributes, [
            'ids'    => '',
            'order'  => 'latest',
            'number' => 5,
        ] );
	    $query_args = [
            'post_type'   => \Kunoichi\Testimonials\TestimonialPostType::get_post_type(),
            'post_status' => 'publish',
        ];
	    $ids = array_filter( array_map( 'trim', explode( ',', $attributes['ids'] ) ), 'is_numeric' );
	    if ( $ids ) {
	        $query_args = array_merge( $query_args, [
                'post__in' => $ids,
                'orderby'  => 'post__in',
            ] );
        } else {
	        switch ( $attributes['order'] ) {
				case 'menu_order':
					$query_args['orderby'] = [
						'menu_order' => 'DESC',
					];
					break;
				case 'random':
				    $query_args['orderby'] = 'rand';
					break;
				default:
                    $query_args['orderby'] = [
                        'date' => 'DESC',
                    ];
                    break;
            }
            $query_args['posts_per_page'] = max( 1, $attributes['number'] );
        }
		$query = new \WP_Query( $query_args );
		if ( ! $query->have_posts() ) {
            return $this->is_rest() ? sprintf(
            	'<div class="components-placeholder"><div class="components-placeholder__label"><span class="dashicons dashicons-awards"></span> %s</div><div class="components-placeholder__instructions">%s</div></div>',
				esc_html__( 'Testimonials', 'kbl' ),
				esc_html__( 'No testimonial matches your criteria.', 'kbl' )
			) : '';
        }
        ob_start();
        ?>
        <div class="kbl-testimonial-wrapper">
            <?php while ( $query->have_posts() ) : $query->the_post(); ?>
                <?php
                $item = apply_filters( 'kbl_testimonials_item', '', $attributes, $content, $query );
                if ( $item ) :
                    echo $content;
                else :
                    $this->get_template_parts( 'block-testimonial' );
                ?>
                <?php endif; ?>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
        <?php
        $content = ob_get_contents();
        ob_end_clean();
		return $content;
	}
}
