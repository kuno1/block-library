<?php

namespace Kunoichi;


use Hametuha\SingletonPattern\BulkRegister;
use Hametuha\SingletonPattern\Singleton;
use Hametuha\StringUtility\Path;
use Hametuha\WpEnqueueManager;
use Kunoichi\BlockLibrary\Pattern\RestBase;

/**
 * Kunoichi Block library manager.
 * @package kbl
 */
class BlockLibrary extends Singleton {

	use Path;

	private static $includes = [];

	private static $excludes = [];

	private static $included_widgets = [];

	private static $excluded_widgets = [];

	/**
	 * Constructor
	 */
	protected function init() {
		// Blocks.
		$this->scan_and_enable( 'BlockLibrary/Blocks', 'Kunoichi\BlockLibrary\Pattern\BlockLibraryBase' );
		// REST API
		BulkRegister::enable( 'Kunoichi\BlockLibrary\Rest', __DIR__ . '/BlockLibrary/Rest', RestBase::class );
		add_action( 'init', [ $this, 'register_components' ] );
		// Register locale.
        add_action( 'init', function() {
            $file = sprintf(dirname( dirname( __DIR__ ) ) . '/languages/kbl-%s.mo', get_user_locale());
            load_textdomain('kbl', $file );
        }, 1 );
        add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
	}

	/**
	 * Scan directory and enable.
	 *
	 * @param string $dir_name
	 * @param $subclass
	 */
	private function scan_and_enable( $dir_name, $subclass ) {
		$dir_name = trim( $dir_name, '/' );
		$dir      = __DIR__ . '/' . $dir_name;
		if ( ! is_dir( $dir ) ) {
			return;
		}
		$name_space = str_replace( '/', '\\', $dir_name );
		foreach ( scandir( $dir ) as $file ) {
			if ( ! preg_match( '/^([^._].*)\.php/u', $file, $matches ) ) {
				continue;
			}
			$class_name = "Kunoichi\\{$name_space}\\{$matches[1]}";
			if ( ! class_exists( $class_name ) ) {
				// Class does not exist.
				continue;
			}
			try {
				// Check class is properly subclass of.
				$reflection = new \ReflectionClass( $class_name );
				if ( ! $reflection || ! $reflection->isSubclassOf( $subclass ) ) {
					continue;
				}
			} catch ( \Exception $e ) {
				continue;
			}
			if ( self::$includes ) {
				if ( in_array( $class_name, self::$includes ) ) {
					$class_name::get_instance();
				} else {
					continue;
				}
			} elseif ( ! in_array( $class_name, self::$excludes ) ) {
				$class_name::get_instance();
			}
		}
	}

    /**
	 * Register JS components.
	 */
	public function register_components() {
		$base_dir = dirname( dirname( __DIR__ ) );
		// Register kbl.
		$kbl = $base_dir . '/dist/js/kbl.js';
		wp_register_script( 'kbl', $this->path_to_url( $kbl ), [ 'wp-i18n' ], filemtime( $kbl ), true );
		wp_set_script_translations( 'kbl', 'kbl', $base_dir . '/languages' );
		// Register components css
		$kbl_style = $base_dir . '/dist/css';
		foreach ( scandir( $kbl_style)  as $css ) {
			if ( ! preg_match( '/^([^._].*)\.css$/u', $css, $match ) ) {
				continue;
			}
			list( $file, $handle ) = $match;
			if ( 'editor' === $handle ) {
				$handle = 'kbl-components';
			} else {
				$handle = 'kbl-' . $handle;
			}
			$path = $base_dir . '/dist/css/' . $file;
			wp_register_style( $handle, $this->path_to_url( $path ), WpEnqueueManager::grab_deps( $path ), filemtime( $path ) );
		}

		// Load components.
		WpEnqueueManager::register_js( $base_dir . '/dist/js/components', 'kbl-components-' );
	}

	public function admin_enqueue_scripts() {
		wp_enqueue_style( 'kbl-components' );
	}

	/**
	 * Register widgets.
	 *
	 */
	protected function register_widgets() {
		add_action( 'widgets_init', [ $this, 'widgets_init' ] );
	}

	/**
	 * Register widgets hooks.
	 */
	public function widgets_init() {
		$base = __DIR__ . '/BlockLibrary/Widgets';
		foreach ( scandir( $base ) as $file ) {
			if ( ! preg_match( '/^([^._].*)\.php$/u',$file, $matches ) ) {
				continue;
			}
			$class_name = 'Kunoichi\BlockLibrary\Widgets\\' . $matches[1];
			if ( ! class_exists( $class_name ) ) {
				continue;
			}
			// If includes specified, check it's inclued.
			if ( self::$included_widgets && ! in_array( $class_name, self::$included_widgets ) ) {
				continue;
			}
			// If excluded, skip.
			if ( self::$excluded_widgets && in_array( $class_name, self::$excluded_widgets ) ) {
				continue;
			}
			$reflection = new \ReflectionClass( $class_name );
			if ( ! $reflection->isSubclassOf( 'WP_Widget' ) ) {
				continue;
			}
			if ( $reflection->hasMethod( 'is_available' ) && ! $class_name::is_available() ) {
				continue;
			}
			register_widget( $class_name );
		}
	}

	/**
	 * Initialize block library
	 *
	 * @param string[] $includes Absolute class name which you want to include explicitly.
	 * @param string[] $excludes Absolute class name which you want not to include explicitly.
	 */
	public static function enable( $includes = [], $excludes = [] ) {
		self::$includes = $includes;
		self::$excludes = $excludes;
		self::get_instance();
	}

	/**
	 * Register widgets.
	 *
	 * @param array $includes Widgets to be included.
	 * @param array $excludes Widgets to be excluded.
	 */
	public static function widgets( $includes = [], $excludes = [] ) {
		self::$included_widgets = $includes;
		self::$excluded_widgets = $excludes;
		self::get_instance()->register_widgets();
	}
}
