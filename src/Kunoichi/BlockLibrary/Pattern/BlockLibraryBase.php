<?php

namespace Kunoichi\BlockLibrary\Pattern;


use Hametuha\WpBlockCreator\Pattern\AbstractBlock;
use Hametuha\WpEnqueueManager;

/**
 * Abstract base
 *
 * @package kbl
 */
abstract class BlockLibraryBase extends AbstractBlock {

	protected $prefix = 'kunoichi';
	
	protected $script = '';
	
	protected $style  = '';
	
	/**
	 * Get base directory.
	 *
	 * @return string
	 */
	public function base_dir() {
		return dirname( dirname( dirname( dirname( __DIR__ ) ) ) );
	}
	
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
	 * Register assets for this block.
	 */
	public function register_assets() {
		parent::register_assets();
		// Register JS.
		$path = $this->base_dir() . '/dist/js/blocks/' . $this->get_block_base() . '.js';
		$path = apply_filters( 'kbl_js_path', $path, $this->get_block_name() );
		if ( file_exists( $path ) ) {
			$this->script = 'kbl-' . $this->get_block_base();
			$version = filemtime( $path );
			$deps    = WpEnqueueManager::grab_deps( $path );
			wp_register_script( $this->script, $this->asset_url( 'js/blocks/' . $this->get_block_base() . '.js' ), $deps, $version, true );
			// TODO: Translations.
			$localize = $this->localize_script();
			if ( $localize ) {
				wp_localize_script( $this->script, $this->kebab_to_camel( $this->script, true ), $localize );
			}
		}
		$css_path = $this->base_dir() . '/dist/css/blocks/' . $this->get_block_base() . '.css';
		$css_path = apply_filters( 'kbl_css_path', $css_path, $this->get_block_name() );
		if ( file_exists( $css_path ) ) {
			$this->style = 'kbl-' . $this->get_block_base();
			$version     = filemtime( $css_path );
			$deps        = WpEnqueueManager::grab_deps( $css_path );
			wp_register_style( $this->style, $this->asset_url( 'css/blocks/' . $this->get_block_base() . '.css' ), $deps, $version );
		}
	}
	
	/**
	 * Localize script.
	 *
	 * @return array
	 */
	protected function localize_script() {
		return [];
	}
	
	/**
	 * Get script for this style.
	 *
	 * @return string
	 */
	protected function get_script() {
		return $this->script;
	}
	
	/**
	 * Get style sheet.
	 *
	 * @return string
	 */
	protected function get_style() {
		return $this->style;
	}
	
	
}
