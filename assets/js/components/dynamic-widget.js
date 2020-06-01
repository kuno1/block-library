/*!
 * Dynamic widget plugin works with jQuery & React.
 *
 * wpdeps=jquery,wp-element,wp-api-fetch, kbl
 */

const $ = jQuery;
const React = wp.element;
const { __, sprintf } = wp.i18n;

/**
 * Detect if element is placeholder.
 *
 * @param {jQuery} $widget
 * @returns {Boolean}
 */
const isPlaceholder = ( $widget ) => {
	return 0 < $widget.parents( '#available-widgets' ).length;
};

$.fn.dynamicWidget = function( options ) {
	// Setup options.
	const settings = $.extend( {
		selector: '.dynamic-widget',
		renderer: null,
		propName: 'value',
	}, options );
	// Save selector.
	const selector = this.selector;
	// If renderer not specified, do nothing.
	if ( ! settings.renderer ) {
		window.console && console.error( sprintf( __( 'Please specify renderer of dynamic widget %s.', 'kbl' ), this.selector ) );
		return this;
	}
	/**
	 * Initialize widget as React component.
	 *
	 * @param {jQuery} $widget
	 */
	const widgetInit = ( $widget ) => {
		if ( isPlaceholder( $widget ) ) {
			// This is inside placeholder, so skip this.
			return;
		}
		// Mount element.
		const Renderer = settings.renderer;
		const props = {
			el: $widget[0],
		};
		props[ settings.propName ] = $widget.find( selector ).val();
		React.render( React.createElement( Renderer, props ), $widget.find( settings.selector )[0] );
		// Bind event listener
		$widget.on( 'widget-value-updated', function( event, value ) {
			$widget.find( selector ).val( value ).trigger( 'change' );
		} );
	};
	// Initialize dynamic widgets.
	return this.each( function( int, input ) {
		const $widget    = $( input ).parents( '.widget' );
		const $container = $widget.find( settings.selector );
		// Register widget change.
		$( document ).on( 'widget-updated widget-added', function( event, widget ) {
			// If widget doesn't have any input, skip.
			if ( ! widget.find( selector ).length ) {
				return;
			}
			widgetInit( widget );
		} );
		// Initialize
		widgetInit( $widget );
	} );
};
