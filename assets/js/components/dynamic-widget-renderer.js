/*!
 * Dynamic widget renderer base.
 *
 * This component suit with KBL dynamic widget component.
 *
 * wpdeps=jquery, wp-element, kbl, kbl-components-dynamic-widget
 */

const { Component } = wp.element;
const $ = jQuery;

class DynamicWidgetRenderer extends Component {

	constructor( props ) {
		super( props );
		this.state = this.filterState( {
			value: this.assignData( props.value ),
		} );
	}

	filterState( state ) {
		return state;
	}

	assignData( val ) {
		return val;
	}

	val() {
		return this.state.value;
	}

	preprocess( val ) {
		return val;
	}

	notify() {
		$( this.props.el ).trigger( 'widget-value-updated', [ this.preprocess( this.val() ) ] );
	}
}

// Export to global.
kbl.DynamicWidgetRenderer = DynamicWidgetRenderer;
