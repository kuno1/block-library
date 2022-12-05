<?php

namespace Kunoichi\BlockLibrary\Pattern;


trait TermConverter {

	/**
	 * Add taxonomy label.
	 *
	 * @param \stdClass $term
	 * @return \stdClass
	 */
	public function add_taxonomy_label( $term ) {
		$taxonomy        = get_taxonomy( $term->taxonomy );
		$term->tax_label = $taxonomy->label;
		return $term;
	}
}
