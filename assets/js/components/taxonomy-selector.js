/*!
 * wpdeps=wp-api-fetch,wp-element, kbl, wp-components, wp-data
 */

const React = wp.element;
const { __, sprintf } = wp.i18n;
const { TextControl, Tooltip, Spinner } = wp.components;

class Term extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			name: '-----',
			taxonomy: '-----',
		};
	}

	componentDidMount() {
		wp.apiFetch( {
			path: `kbl/v1/term/${ this.props.id }`,
		} ).then( ( res ) => {
			this.setState( {
				name: res.name,
				taxonomy: res.tax_label,
			} );
		} ).catch( () => {
			this.setState( {
				name: __( 'ERROR', 'kbl' ),
			} );
		} );
	}

	remove() {
		if ( this.props.onRemove ) {
			this.props.onRemove( this.props.id );
		}
	}

	render() {
		return (
			<Tooltip text={ __( 'Click to remove', 'kbl' ) }>
				<span className="kbl-taxonomy-selector-button" onClick={ () => this.remove() } role="button" tabIndex={ 0 }>
					<small>{ this.state.taxonomy }</small>
					{ this.state.name }
				</span>
			</Tooltip>
		);
	}

}

class TaxonomySelector extends React.Component {

	constructor( props ) {
		super( props );
		this.timer = null;
		this.state = {
			selected: this.props.selected,
			found: [],
			loading: false,
		};
	}

	search( text ) {
		if ( this.timer ) {
			clearTimeout( this.timer );
		}
		this.setState( { found: [] }, () => {
			if ( !text.length ) {
				return;
			}
			this.setState( { loading: true }, () => {
				this.timer = setTimeout( () => {
					wp.apiFetch( {
						path: `kbl/v1/terms?s=${ text }`,
					} ).then( ( res ) => {
						this.setState( {
							found: res.map( ( term ) => {
								return {
									id: parseInt( term.term_id, 10 ),
									name: term.name,
									taxonomy: term.tax_label,
									count: parseInt( term.count, 10 ),
								};
							} ),
						}, () => {
							// console.log( this.state );
						} );
						// console.log( res );
					} ).catch().finally( () => {
						this.setState( { loading: false } );
					} );
				}, 1000 );
			} );
		} );
	}

	remove( id ) {
		const selected = [];
		for ( const termId of this.state.selected ) {
			if ( id !== termId ) {
				selected.push( termId );
			}
		}
		this.setState( {
			selected
		}, () => {
			if ( this.props.onChange ) {
				this.props.onChange( selected );
			}
		} );
	}

	select( id ) {
		const ids = this.state.selected.map( ( value ) => value );
		if ( 0 > ids.indexOf( id ) ) {
			ids.push( id );
		}
		const selected = [];
		for ( let i of ids ) {
			i = parseInt( i, 10 );
			if ( 0 > selected.indexOf( i ) ) {
				selected.push( i );
			}
		}
		this.setState( {
			selected,
		}, () => {
			if ( this.props.onChange ) {
				this.props.onChange( selected );
			}
		} );
	}

	render() {
		return (
			<div className="components-base-control">
				<p style={ { marginBottom: '5px' } }>{ this.props.label || __( 'Taxonomy', 'kbl' ) }</p>
				{ this.state.selected && <div className="kbl-taxonomy-selector-selected">
					{ this.state.selected.map( ( term ) => {
						return <Term key={ term } id={ term } onRemove={ ( id ) => this.remove( id ) } />
					} ) }
				</div> }
				<TextControl placeholder={ __( 'Search...', 'kbl' ) } onChange={ ( text ) => this.search( text ) } />
				<p className="components-base-control__help">
					{ __( 'If taxonomy is set, post list will be filtered.', 'kbl' ) }
				</p>
				{ this.state.loading && (
					<Spinner />
				) }
				{ ( !this.state.loading ) && this.state.found && this.state.found.map( ( term ) => {
					return (
						<Tooltip text={ __( 'Click to add', 'kbl' ) } key={ term.id }>
							<span className="kbl-taxonomy-selector-button kbl-taxonomy-selector-button-secondary"
								  onClick={ () => this.select( term.id ) } tabIndex={ 0 } role="button">
								<small>{ term.taxonomy }</small>
								{ term.name }{ sprintf( __( '(%d)', 'kbl' ), term.count ) }
							</span>
						</Tooltip>
					);
				} ) }
			</div>
		);
	}
}

window.kbl.TaxonomySelector = TaxonomySelector;
