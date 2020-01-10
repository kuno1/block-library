<?php

namespace Kunoichi;


use Hametuha\SingletonPattern\BulkRegister;
use Hametuha\SingletonPattern\Singleton;
use Hametuha\WpEnqueueManager;
use Kunoichi\BlockLibrary\Pattern\RestBase;

/**
 * Kunoichi Block library manager.
 * @package kbl
 */
class BlockLibrary extends Singleton {

	private static $includes = [];

	private static $excludes = [];

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
				if ( in_array( $matches[1], self::$includes ) ) {
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
		wp_register_script( 'kbl', str_replace( ABSPATH, home_url( '/' ), $kbl ), [ 'wp-i18n' ], filemtime( $kbl ), true );
		wp_set_script_translations( 'kbl', 'kbl', $base_dir . '/languages' );
		// Register componnets css
		$kbl_style = $base_dir . '/dist/css/editor.css';
		wp_register_style( 'kbl-components', str_replace( ABSPATH, home_url( '/' ), $kbl_style ), [], filemtime( $kbl_style ) );
		// Load components.
		WpEnqueueManager::register_js( $base_dir . '/dist/js/components', 'kbl-components-' );
	}

	public function admin_enqueue_scripts() {
		wp_enqueue_style( 'kbl-components' );
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
}