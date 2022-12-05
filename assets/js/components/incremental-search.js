/*!
 * Incremental search control.
 *
 * wpdeps=wp-element, wp-components, kbl
 */

const React = wp.element;
const { TextControl } = wp.components;
const { __ } = wp.i18n;

class IncrementalSearch extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			focus: false,
			term: '',
			timer: null,
			clearTimer: null,
		};
	}

	getDelay() {
		return this.props.delay || 500;
	}

	render() {
		const { searching, onSelect, suggestions, total } = this.props;
		const hasResult = !! ( suggestions && suggestions.length );
		return (
			<div className="kbl-incremental-search">
				<TextControl value={ this.state.term }  placeholder={ __( 'Type and search…', 'kbl' ) } label={ this.props.label || '' }
					onChange={ ( term ) => {
						this.setState( { term }, () => {
							this.enqueueSearch();
						} );
					} }
					onFocus={ () => {
						if ( this.state.term.length ) {
							this.enqueueSearch();
						}
					} }
					onBlur={ () => {
						this.clearCountDown();
					} }
				 />

				{ searching && (
					<div className="kbl-incremental-search-result">
						<div className="kbl-incremental-search-summary"> { __( 'Searching…', 'kbl' ) }</div>
					</div>
				) }

				{ hasResult && (
					<div className="kbl-incremental-search-result">
						{ total && (
							<div className="kbl-incremental-search-summary"> { suggestions.length } / { total }</div>
						) }
						<ul className="kbl-incremental-search-list">
							{ suggestions.map( ( suggestion ) => {
								return (
									<li key={ `kbl-incremental-search-suggestion-${ suggestion.id }` }
										className="kbl-incremental-search-item" tabIndex={ 0 }
										onClick={ () => {
											if ( onSelect ) {
												onSelect( suggestion.id );
											}
										} }>{ suggestion.title }</li>
								);
							} ) }
						</ul>
					</div>
				) }
			</div>
		);
	}

	enqueueSearch() {
		if ( this.state.timer ) {
			clearTimeout( this.state.timer );
		}
		this.setState( {
			timer: setTimeout( () => {
				this.fetch();
			}, this.getDelay() ),
		} );
	}

	fetch() {
		if ( this.state.term.length ) {
			if ( this.props.onSearch ) {
				this.props.onSearch( this.state.term );
			}
		} else {
			this.flush();
		}
	}

	flush() {
		if ( this.props.onClear ) {
			this.props.onClear();
		}
	}

	clearCountDown( reset = true ) {
		if ( this.state.clearTimer ) {
			clearTimeout( this.state.clearTimer );
		}
		if ( reset ) {
			this.setState( {
				clearTimer: setTimeout( () => {
					this.flush();
				}, 3000 ),
			} );
		} else {
			this.setState( {
				clearTimer: null,
			} );
		}
	}
}

kbl.IncrementalSearch = IncrementalSearch;
