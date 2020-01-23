<?php

namespace Kunoichi\BlockLibrary\Widgets;


use Kunoichi\BlockLibrary\Pattern\Widgets;
use Kunoichi\BlockLibrary\PostTypes\CallToActionPostType;

/**
 * Call To Action widget.
 */
class CallToActionWidget extends Widgets {

	protected function get_id_base() {
		return 'call-to-action';
	}

	protected function get_name() {
		return __( 'Call To Action', 'kbl' );
	}

	protected function parse_args( $instance ) {
	}

	/**
	 * @param array $args
	 * @param array $instance
	 * @return false|string
	 */
	protected function widget_content( $args, $instance ) {
		$query = CallToActionPostType::get( $instance );
		if ( ! $query->have_posts() ) {
			return '';
		}
		ob_start();
		while( $query->have_posts() ) {
			$query->the_post();
			CallToActionPostType::load( 'widget' );
		}
		wp_reset_postdata();
		$content = ob_get_contents();
		ob_end_clean();
		return trim( $content );
	}

	public function form( $instance ) {
		parent::form( $instance );
		$instance = CallToActionPostType::parse( $instance );
		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'order' ) ?>"><?php ?></label>
	        <select id="<?php echo $this->get_field_id( 'order' ) ?>" name="<?php echo $this->get_field_name( 'order' ) ?>">
                <?php foreach ( CallToActionPostType::orders() as $value => $label ) : ?>
                    <option value="<?php echo esc_attr( $value ) ?>"<?php selected( $value, $instance['order'] ) ?>><?php echo esc_html( $label ) ?></option>
                <?php endforeach; ?>
            </select>
		</p>
		<?php
		$positions = [];
		$terms = get_terms( [ 'taxonomy' => 'cta-position', 'hide_empty' => false, ] );
		if ( $terms && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $term ) {
				$positions[ $term->term_id ] = $term->name;
			}
		}
		foreach ( [
					  [ 'position', __( 'Positions', 'kbl' ), $positions ],
					  [ 'predefined_position', __( 'Predefined Positions', 'kbl' ), CallToActionPostType::get_predefined_positions() ]
				  ] as list( $field, $label, $options ) ) :
			if ( ! $options || is_wp_error( $options ) ) {
				continue;
			}
			$values = $instance[ $field ];
			?>
			<p>
				<label><?php echo esc_html_e( $$label ) ?></label>
				<?php foreach ( $options as $value => $name ) : ?>
					<label style="display: block;">
						<input type="checkbox" name="<?php echo $this->get_field_name( $field ) ?>[]"
							<?php checked( in_array( $value, $values ) ) ?>
							   value="<?php echo esc_attr( $value ) ?>" />
						<?php echo esc_html( $name ) ?>
					</label>
				<?php endforeach; ?>
			</p>
		<?php endforeach;
	}
}
