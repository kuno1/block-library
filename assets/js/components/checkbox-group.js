/*!
 * wpdeps=wp-element, wp-components, kbl
 */

const React = wp.element;
const { CheckboxControl } = wp.components;

class CheckboxGroup extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			checked: props.checked,
		};

	}

	render() {
		return this.props.options.map( ( option ) => {
			return  <CheckboxControl key={ option.value } label={ option.label } checked={ this.isChecked( option.value ) }
									 onChange={ ( checked ) => this.onChangeHandler( option.value, checked ) } />

		} );
	}

	isChecked( value ) {
		return -1 < this.state.checked.indexOf( value );
	}

	onChangeHandler( value, isChecked ) {
		if ( isChecked ) {
			const newArray = this.state.checked.map( ( val ) => val );
			// Append if not exist..
			if ( 0 > newArray.indexOf( value ) ) {
				newArray.push( value );
			}
			this.setState( { checked: newArray }, () => {
				this.props.onChange( newArray );
			} );
		} else {
			// Remove
			const newArray = [];
			for ( const val of this.state.checked ) {
				if ( value !== val ) {
					newArray.push( val );
				}
			}
			this.setState( { checked: newArray }, () => {
				this.props.onChange( newArray );
			} );
		}
	}
}

kbl.CheckboxGroup = CheckboxGroup;
