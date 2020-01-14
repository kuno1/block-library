<?php

namespace Kunoichi\BlockLibrary\Blocks;


use Kunoichi\BlockLibrary\Pattern\BlockLibraryBase;

class Alert extends BlockLibraryBase {

	protected $block_name = 'alert';

	protected function localize_script() {
		$styles  = [
			'primary'   => __( 'Primary', 'kbl' ),
			'secondary' => __( 'Secondary', 'kbl' ),
			'success'   => __( 'Success', 'kbl' ),
			'danger'    => __( 'Danger', 'kbl' ),
			'warning'   => __( 'Warning', 'kbl' ),
			'info'      => __( 'Info', 'kbl' ),
			'light'     => __( 'Light', 'kbl' ),
			'dark'      => __( 'Dark', 'kbl' ),
		];
		return apply_filters( 'kbl_alert_styles', [
			'styles'      => apply_filters( 'kbl_alert_styles', $styles ),
		] );
	}
}
