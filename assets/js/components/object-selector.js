/*!
 * User selector
 * wpdeps=wp-api-fetch,wp-element, kbl, wp-components, wp-data
 */

const React = wp.element;
const { __ } = wp.i18n;
const { TextControl, Button, Spinner } = wp.components;


class ObjectSelector extends React.Component {

	constructor( props ) {
		super( props );
		// Set id.
		this.state = {
			searching: false,
			loading: false,
			object: null,
			term: '',
			founds: [],
		};
	}

	notice( message, style = 'success' ) {
		wp.data.dispatch( 'core/notices' ).createNotice( style, message, {
			isDismissible: true,
		} );
	}

	componentDidMount() {
		if ( this.props.id ) {
			this.fetch( this.props.id );
		}
	}

	handleChange( id ) {
		if ( this.props.onChange ) {
			this.props.onChange( id );
		}
	}

	fetch( id ) {
		console.error( 'kbl.ObjectSelector:Override this method' );
	}

	search() {
		console.error( 'kbl.ObjectSelector:Override this method' );
	}

	/**
	 * Set user id
	 *
	 * @param {Object} target
	 */
	setCurrent( target ) {
		this.setState( {
			object: target,
			founds:[],
			term: '',
		}, () => {
			this.handleChange( target ? target.id : 0 );
		} );
	}

	render() {
		const tags = [];
		const { term, loading, searching, object, founds } = this.state;
		return (
			<div className="kbl-user-search">
				{ loading && <Spinner /> }
				<div className="kbl-user-current">
					<h4 className="kbl-user-heading">{ this.props.currentLabel || __( 'Specify User', 'kbl' ) }</h4>
					{ object && (
						this.renderObject( object, false )
					) }
				</div>
				<TextControl label={ this.props.label || __( 'Search', 'kbl' ) } value={ term } placeholder={ __( 'Enter search keywords...', 'kbl' ) }
							 onChange={ ( value ) => this.setState( { term: value } ) } />
				<Button className="button" isSecondary={ true } disabled={ ! term.length } isBusy={ searching }
						onClick={ () => this.search() }>
					{ __( 'Search', 'kbl' ) }
				</Button>
				{ !! founds.length && (
					<div className="kbl-user-found">
						{ founds.map( ( found ) => this.renderObject( found, true ) ) }
					</div>
				) }
			</div>
		);
	}

	renderObject( object, adding = true ) {
		console.error( 'kbl.ObjectSelector.renderObject: override this method.' )
	}
}

window.kbl.ObjectSelector = ObjectSelector;
