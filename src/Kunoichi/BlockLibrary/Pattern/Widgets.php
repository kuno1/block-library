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
		add_action( 'init', [ $this, 'register_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
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
		if ( ! $content ) {
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
	 * Get description.
	 *
	 * @return string
	 */
	protected function description() {
		return '';
	}

	/**
	 * Widget options.
	 *
	 * @return array
	 */
	protected function widget_options() {
		$option = [];
		if ( $description = $this->description() ) {
			$option['description'] = $description;
		}
		return $option;
	}

	/**
	 * Control options.
	 *
	 * @return array Default empty array.
	 */
	protected function control_options() {
		return [];
	}

	/**
	 * Register scripts
	 *
	 * If you need to register scripts or assets, override this function.
	 */
	public function register_scripts() {
		// Do something.
	}

	/**
	 * Enqueue scripts.
	 *
	 * By default, this enqueues scripts and styles from admin_
	 */
	public function admin_enqueue_scripts() {
		if ( ! function_exists( 'get_current_screen' ) ) {
			return;
		}
		$screen = get_current_screen();
		if ( ! $screen || ! in_array( $screen->base, [ 'widgets', 'customize' ] ) ) {
			return;
		}
		$scripts = $this->get_admin_scripts();
		foreach ( $scripts as $script ) {
			wp_enqueue_script( $script );
		}
		$styles = $this->get_admin_styles();
		foreach ( $styles as $style ) {
			wp_enqueue_style( $style );
		}
	}

	/**
	 * Enqueue scripts
	 *
	 * @return string[]
	 */
	protected function get_admin_scripts() {
		return [];
	}

	protected function get_admin_styles() {
		return [];
	}
}
