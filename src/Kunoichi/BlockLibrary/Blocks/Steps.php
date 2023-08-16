<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

/**
 * How to block supporting JSON-LD.
 */
class Steps extends BlockLibraryBase {

	protected $block_name = 'steps';

	protected function init() {
		parent::init();
		add_action( 'wp_head', [ $this, 'render_json_ld' ], 9999 );
	}

	/**
	 * Render JSON ld.
	 */
	public function render_json_ld() {
		if ( ! is_singular() ) {
			return;
		}
		if ( ! has_block( 'kunoichi/steps', get_queried_object() ) ) {
			return;
		}
		$blocks = parse_blocks( get_queried_object()->post_content );
		foreach ( $blocks as $block ) {
			if ( 'kunoichi/steps' !== $block['blockName'] ) {
				continue;
			}
			// Grab name.
			if ( ! preg_match( '#<h[1-6] class="kbl-step-title">(.*?)</h[1-6]>#', $block['innerHTML'], $match ) ) {
				continue;
			}
			$json = [
				'name'  => $match[1],
				'step' => [],
			];
			// Total Time,
			if ( ! empty( $block['attrs']['totalTime'] ) ) {
				$total_time = $block['attrs']['totalTime'];
				if ( preg_match( '/d$/', $total_time ) ) {
					$total_time = sprintf( 'P%dD', str_replace( 'd', '', $total_time ) );
				} else {
					if ( 59 < $total_time ) {
						$total_time = sprintf( 'PT%dH%dM', floor( $total_time / 60 ), $total_time % 60 );
					} else {
						$total_time = sprintf( 'PT%dM', $total_time );
					}
				}
				$json['totalTime'] = $total_time;
			}
			// Tools and supplies.
			foreach ( [
				'tools'    => 'tool',
				'supplies' => 'supply',
			] as $attr => $key ) {
				if ( empty( $block['attrs'][ $attr ] ) ) {
					continue 1;
				}
				if ( ! isset( $json[ $key ] ) ) {
					$json[ $key ] = [];
				}
				foreach ( array_filter( preg_split( '/\r?\n/', $block['attrs'][ $attr ] ) ) as $name ) {
					$json[ $key ][] = [
						'@type' => 'HowTo' . ucfirst( $key ),
						'name'  => $name,
					];
				}
			}
			foreach ( $block['innerBlocks'] as $child ) {
				switch ( $child['blockName'] ) {
					case 'kunoichi/step':
						if ( ! preg_match( '#<h[1-6] class="kbl-step-name">(.*?)</h[1-6]>#u', $child['innerHTML'], $matches ) ) {
							break;
						}
						$step = [
							'@type'           => 'HowToStep',
							'name'            => $matches[1],
							'itemListElement' => [],
						];
						// Extract direction.
						if ( preg_match( '#<div class="kbl-step-direction">(.*?)</div>#u', $child['innerHTML'], $directions ) ) {
							$text = array_filter( array_map( function( $p ) {
								$p = str_replace( '<p>', '', $p );
								$p = trim( $p );
								return $p;
							}, explode( '</p>', $directions[1] ) ) );
							foreach ( $text as $p ) {
								$step['itemListElement'][] = [
									'@type' => 'HowToDirection',
									'text'  => $p,
								];
							}
						}
						// Extract tip.
						if ( preg_match( '#<p class="kbl-step-tip">(.*?)</p>#u', $child['innerHTML'], $tip ) ) {
							$step['itemListElement'][] = [
								'@type' => 'HowToTip',
								'text'  => $tip[1],
							];
						}
						// Parse images.
						if ( ! empty( $child['innerBlocks'] ) ) {
							foreach ( $child['innerBlocks'] as $img ) {
								$id  = $img['attrs']['id'];
								$src = wp_get_attachment_image_src( $id, 'full' );
								if ( ! $src ) {
									continue;
								}
								list( $url, $width, $height ) = $src;
								$step['image']                = [
									'@type'  => 'ImageObject',
									'url'    => $url,
									'width'  => $width,
									'height' => $height,
								];
								break 1;
							}
						}
						$json['step'][] = $step;
						break;
				}
			}
			$this->json_ld( $json, 'HowTo' );
			break;
		}
	}
}
