<?php
/**
 * Plugin Name: Kunoichi Block Library
 * Plugin URI:  https://github.com/kuno1/block-library
 * Description: Block library for WordPress theme.
 * Version:     0.8.0
 * Author:      Kunoichi INC.
 * Author URI:  https://kunoichiwp.com
 * License:     GPLv3 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
 * Text Domain: kbl
 * Domain Path: /languages
 */

// This file actually do nothing.
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Invalid request.' );
}

add_action( 'plugins_loaded', function() {
	require __DIR__ . '/vendor/autoload.php';

	\Kunoichi\BlockLibrary::enable();

	// If virtual member exists, add suport.
	if ( class_exists( 'Kunoichi\\VirtualMember\\PostType' ) ) {
		\Kunoichi\VirtualMember\PostType::register();
	}
} );

