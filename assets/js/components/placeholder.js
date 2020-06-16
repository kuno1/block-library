/*!
 * Object Placeholder
 * wpdeps=wp-api-fetch,wp-element,kbl,wp-components,wp-data, moment
 */



const React = wp.element;
const { __ } = wp.i18n;
const caches = {};
const { Button, ButtonGroup } = wp.components;

class ObjectPlaceholder extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			data: this.placeHolder(),
			loading: false,
		};
	}

	componentDidMount() {
		this.fetch();
	}

	fetch() {
		if ( this.hasCache() ) {
			return this.getCache();
		}
		this.setState( {
			loading: true,
		}, () => {
			this.apiFetch().then( ( response ) => {
				return this.handleSuccess( response );
			} ).catch( () => {
				if ( this.props.errorHandler instanceof Function ) {
					this.props.errorHandler( this.props.id );
				}
			} ).finally( () => {
				this.setState( {
					loading: false,
				} );
			} );
		} );
	}

	apiFetch() {
		if ( console ) {
			console.error( 'You must override this method to returns wp-api-fetch object.' ); // eslint-disable-line no-console
		}
	}

	handleSuccess( response ) {
		this.setState( {
			data: response,
		}, () => {
			this.setCache( response );
		} );
	}

	render() {
		const classNames = [ 'kbl-placeholder' ];
		if ( this.state.loading ) {
			classNames.push( 'loading' );
		}
		return (
			<div className={ classNames.join( ' ' ) }>
				<div className="kbl-placeholder-body">
					{ this.renderObject() }
				</div>
				{ this.props.actions && (
					<div style={ { textAlign: 'right' } }>
						<ButtonGroup className="kbl-placeholder-actions">
							{ this.props.actions.map( ( action, i ) => {
								return <Button key={ `action-${ i }` } iconSize={ 16 } isSmall={ true } label={ action.label } icon={ action.icon || 'plus' } onClick={ () => {
									action.handler( this.props.id );
								} } />
							} ) }
						</ButtonGroup>
					</div>
				) }
			</div>
		);
	}

	renderObject() {
		return <p className="description">Please override this methods.</p>;
	}

	/**
	 * Check if cache exists.
	 *
	 * @return {boolean} If cache exists.
	 */
	hasCache() {
		if ( ! caches[ this.constructor.name ] ) {
			return false;
		}
		return !! caches[ this.constructor.name ][ this.props.id ];
	}

	getCache() {
		if ( this.hasCache() ) {
			return caches[ this.constructor.name ][ this.props.id ];
		}
		return null;
	}

	setCache( data ) {
		if ( ! caches[ this.constructor.name ] ) {
			caches[ this.constructor.name ] = [];
		}
		caches[ this.constructor.name ][ this.props.id ] = data;
	}

	placeHolder() {
		return {
			title: __( 'Title', 'kbl' ),
			img: null,
		};
	}
}

window.kbl.ObjectPlaceholder = ObjectPlaceholder;
