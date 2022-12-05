<?php

namespace Kunoichi\BlockLibrary\Pattern;

use Hametuha\StringUtility\Path;

/**
 * Template loader
 *
 * @package Kunoichi\BlockLibrary\Pattern
 */
trait TemplateLoader {

	use Path;

	/**
	 * Get URL from directory path.
	 *
	 * @param string $path
	 * @return string
	 */
	public function asset_url( $path ) {
		$base = $this->base_dir() . '/dist/' . ltrim( $path, '/' );
		return $this->path_to_url( $base );
	}

	/**
	 * Load template.
	 *
	 * @param string $name
	 * @param string $suffix
	 * @return bool
	 */
	protected function get_template_parts( $name, $suffix = '' ) {
		$name      = 'template-parts/' . ltrim( $name, '/' );
		$rel_paths = [ $name . '.php' ];
		if ( $suffix ) {
			array_unshift( $rel_paths, sprintf( '%s-%s.php', $name, $suffix ) );
		}
		foreach ( $rel_paths as $rel_path ) {
			$path = $this->dir() . '/' . $rel_path;
			foreach ( [ get_template_directory(), get_stylesheet_directory() ] as $theme_dir ) {
				$theme_path = $theme_dir . '/' . str_replace( 'template-parts/', 'template-parts/kbl/', $rel_path );
				if ( file_exists( $theme_path ) ) {
					$path = $theme_path;
				}
			}
			$path = apply_filters( 'kbl_template_path', $path );
			if ( file_exists( $path ) ) {
				load_template( $path, false );
				return true;
			}
		}
		return false;
	}

	/**
	 * Get root directory.
	 *
	 * @return string
	 */
	protected function dir() {
		return dirname( dirname( dirname( dirname( __DIR__ ) ) ) );
	}

	/**
	 * Get base directory.
	 *
	 * @return string
	 */
	public function base_dir() {
		return dirname( dirname( dirname( dirname( __DIR__ ) ) ) );
	}
}
