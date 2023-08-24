<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

/**
 * Toc Block
 *
 * @package Kunoichi\BlockLibrary\Blocks
 */
class Toc extends BlockLibraryBase {

	const PLACE_HOLDER = ':::TOC:::';

	protected $block_name = 'toc';

	/**
	 * Parser object.
	 *
	 * @var null|\Kunoichi\TocGenerator\Parser
	 */
	protected $parser = null;

	/**
	 * @return void
	 */
	protected function init() {
		if ( ! class_exists( 'Kunoichi\TocGenerator\Parser' ) ) {
			$this->disabled = true;
		} else {
			add_action( 'rest_api_init', [ $this, 'on_rest_api_init' ] );
			add_filter( 'the_content', [ $this, 'the_content_filter' ], 1 );
			add_filter( 'the_content', [ $this, 'convert_toc' ], 11 );
		}
		return parent::init();
	}

	/**
	 * @return void
	 */
	public function on_rest_api_init() {
		$args = $this->filter_attributes( [] );
		register_rest_route( 'kbl/v1', '/toc', [
			'methods'             => 'POST',
			'args'                => array_merge( [
				'body' => [
					'type'     => 'string',
					'required' => true,
				],
			], $args['attributes'] ),
			'callback'            => [ $this, 'rest_api_callback' ],
			'permission_callback' => '__return_true',
		] );
	}

	/**
	 * Handle REST API request.
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function rest_api_callback( $request ) {
		return new \WP_REST_Response( [
			'toc' => $this->render( $request->get_param( 'body' ), $request->get_params() ),
		] );
	}

	/**
	 * {@inheritdoc}
	 */
	protected function filter_attributes( $args ) {
		$args['attributes'] = [
			'max_depth' => [
				'type'    => 'integer',
				'default' => 3,
			],
			'prefix'    => [
				'type'    => 'string',
				'default' => 'content-section-',
			],
			'className' => [
				'type'    => 'string',
				'default' => '',
			],
			'title'     => [
				'type'    => 'string',
				'default' => '',
			],
		];
		return $args;
	}

	/**
	 * Convert HTML string to TOC.
	 *
	 * @param string $html
	 * @param array  $attributes
	 *
	 * @return string
	 */
	protected function render( $html, $attributes = [] ) {
		$attributes = $this->args( $attributes );
		if ( ! $this->parser ) {
			$this->parser = new \Kunoichi\TocGenerator\Parser( $attributes['max_depth'], true, $attributes['prefix'] );
			$html         = $this->parser->add_link_html( $html );
		}
		if ( $attributes['title'] ) {
			$this->parser->set_title( $attributes['title'] );
		}
		$classes = [ 'kbl-toc' ];
		if ( $attributes['className'] ) {
			$classes[] = $attributes['className'];
		}
		// Parse HTML.
		$this->parser->save_parsed_html( $html );
		$toc = $this->parser->get_toc( [], implode( ' ', $classes ) );
		return $toc;
	}

	/**
	 * {@inheritDoc}
	 */
	public function render_callback( $attributes = [], $content = '' ) {
		return self::PLACE_HOLDER;
	}

	/**
	 * Add link id to html elements.
	 *
	 * @param string $content Post content.
	 * @return string
	 */
	public function the_content_filter( $content ) {
		if ( ! $this->should_display() ) {
			return $content;
		}
		foreach ( parse_blocks( $content ) as $block ) {
			if ( 'kunoichi/toc' === $block['blockName'] ) {
				$attributes   = $this->args( $block['attrs'] );
				$this->parser = new \Kunoichi\TocGenerator\Parser( $attributes['max_depth'], true, $attributes['prefix'] );
				if ( $attributes['title'] ) {
					$this->parser->set_title( $attributes['title'] );
				}
				$content = $this->parser->add_link_html( $content );
				break;
			}
		}
		return $content;
	}

	/**
	 * Parse attributes.
	 *
	 * @param array $attributes
	 * @return array
	 */
	protected function args( array $attributes ) {
		return wp_parse_args( $attributes, [
			'max_depth' => 3,
			'prefix'    => 'content-section-',
			'className' => '',
			'title'     => '',
		] );
	}

	/**
	 * Display TOC.
	 *
	 * @param string $content Post content.
	 * @return string
	 */
	public function convert_toc( $content ) {
		if ( ! $this->should_display() ) {
			return $content;
		}
		return str_replace( self::PLACE_HOLDER, $this->render( $content ), $content );
	}

	/**
	 * Should display toc?
	 *
	 * @return bool
	 */
	protected function should_display() {
		if ( ! is_singular() || get_the_ID() !== get_queried_object_id() ) {
			// Only works in single page.
			return false;
		}
		if ( ! has_block( 'kunoichi/toc' ) ) {
			// If no block exists, stop.
			return false;
		}
		if ( ! in_the_loop() || ! is_main_query() ) {
			// Only works in main loop.
			return false;
		}
		return true;
	}
}
