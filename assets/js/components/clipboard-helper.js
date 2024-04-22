/*!
 * wpdeps=jquery, kbl, wp-hooks
 */
/*eslint no-alert: "off"*/

const $ = jQuery;
const { __ } = wp.i18n;
const { applyFilters, doAction } = wp.hooks;

const execCopy = ( string ) => {
	const tmp = document.createElement( 'div' );
	const pre = document.createElement( 'pre' );
	// If parent elements has `user-select: none`, cannot copy.
	// So let's override this property.
	pre.style.webkitUserSelect = 'auto';
	pre.style.userSelect = 'auto';

	tmp.appendChild( pre ).textContent = string;
	// Mover element outside window.
	const s = tmp.style;
	s.position = 'fixed';
	s.right = '200%';
	// Append to body
	document.body.appendChild( tmp );
	// Select element.
	document.getSelection().selectAllChildren( tmp );
	// Copy to clipboard.
	const result = document.execCommand( 'copy' );
	// Remove parent.
	document.body.removeChild( tmp );
	return result;
};

// Add event listener for click event.
$( '.kbl-clipboard-button' ).click( function( e ) {
	e.preventDefault();
	// Remove br element.
	const content = $( this ).next( '.kbl-clipboard-content' ).html().replace( /(<br>|<br\/>|<br \/>)/gm, '\n' );
	execCopy( content );
	const msg = __( 'Data is copied to clipboard.', 'kbl' );
	const shouldCall = applyFilters( 'kbl_copy_alert', true, msg, this );
	if ( shouldCall ) {
		alert( msg );
	}
	doAction( 'kbl_copy_done', msg, this );
} );
