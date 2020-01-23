<?php

namespace Kunoichi\BlockLibrary\Pattern;


use Kunoichi\BlockLibrary\PostTypes\CallToActionPostType;

/**
 * Widgets
 *
 * @package kbl
 */
abstract class Widgets extends \WP_Widget {

	public static function is_available() {
		return true;
	}

	protected $has_title = true;

	/**
	 * Widgets constructor.
	 */
	public function __construct() {
		parent::__construct( $this->get_id_base(), $this->get_name(), $this->widget_options(), $this->control_options() );
	}

	/**
	 * Should return id_base.
	 *
	 * @return string
	 */
	abstract protected function get_id_base();

	/**
	 * Should return name
	 *
	 * @return string
	 */
	abstract protected function get_name();

	/**
	 * Render form fields.
	 *
	 * Override this to
	 *
	 * @param array $instance
	 * @return void
	 */
	public function form( $instance ) {
		if ( $this->has_title ) {
			?>
			<p>
				<label for="<?php echo $this->get_field_id( 'title' ) ?>"><?php esc_html_e( 'Title', 'kbl' ) ?></label>
				<input name="<?php echo $this->get_field_name( 'title' ) ?>"
					   id="<?php echo $this->get_field_id( 'title' ) ?>" class="widefat"
					   value="<?php echo esc_attr( isset( $instance[ 'title' ] ) ? $instance[ 'title' ] : '' ) ?>"/>
			</p>
			<?php
		}
	}

	/**
	 * Render widget.
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		$content = $this->widget_content( $args, $instance );
		if ( !$content ) {
			return;
		}
		echo $args[ 'before_widget' ];
		if ( $this->has_title && isset( $instance[ 'title' ] ) && $instance[ 'title' ] ) {
			echo apply_filters( 'kbl_widget_title', sprintf( '%s%s%s', $args[ 'before_title' ], esc_html( $instance[ 'title' ] ), $args[ 'after_title' ] ), $args, $instance );
		}
		do_action( 'kbl_before_widget_content', $args, $instance );
		echo $content;
		do_action( 'kbl_after_widget_content', $args, $instance );
		echo $args[ 'after_widget' ];
	}

	/**
	 * Render widget content.
	 *
	 * @param array $args
	 * @param array $instance
	 * @return string
	 */
	abstract protected function widget_content( $args, $instance );

	/**
	 * Widget options.
	 *
	 * @return array
	 */
	protected function widget_options() {
		return [];
	}

	/**
	 * Control options.
	 *
	 * @return array
	 */
	protected function control_options() {
		return [];
	}
}
