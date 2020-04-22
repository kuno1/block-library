/*!
 * Helper scripts for opening section.
 *
 * wpdeps=jquery
 */

const $ = jQuery;

$( '.kbl-section-more' ).click( function( e ) {
	e.preventDefault();
	const $parent = $( this ).parents( '.wp-block-kunoichi-section' );
	$parent.css( 'max-height', '99999px' ).addClass( 'has-more-button-opened' );
	$( this ).remove();
	$parent.trigger( 'kbl.section.open' );
} );
