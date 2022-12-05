<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class DefinitionList extends BlockLibraryBase {

	protected $block_name = 'definition-list';

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
		if ( ! has_block( 'kunoichi/definition-list', get_queried_object() ) ) {
			return;
		}
		$blocks = parse_blocks( get_queried_object()->post_content );
		foreach ( $blocks as $block ) {
			if ( 'kunoichi/definition-list' !== $block['blockName'] ) {
				continue;
			}

			if ( ! ( isset( $block['attrs']['faq'] ) && $block['attrs']['faq'] ) ) {
				continue;
			}
			$faqs = [];
			foreach ( $block['innerBlocks'] as $index => $dt ) {
				if ( 'kunoichi/dt' !== $dt['blockName'] ) {
					continue;
				}

				if ( ! isset( $block['innerBlocks'][ $index + 1 ] ) || 'kunoichi/dd' !== $block['innerBlocks'][ $index + 1 ]['blockName'] ) {
					continue;
				}
				$dd     = $block['innerBlocks'][ $index + 1 ];
				$faqs[] = [
					'@type'          => 'Question',
					'name'           => trim( strip_tags( $dt['innerHTML'] ) ),
					'acceptedAnswer' => [
						'@type' => 'Answer',
						'text'  => trim( strip_tags( $dd['innerHTML'] ) ),
					],
				];
			}
			if ( ! $faqs ) {
				continue;
			}
			$json = [
				'mainEntity' => $faqs,
			];
			$this->json_ld( $json, 'FAQPage' );
			break;
		}
	}
}
