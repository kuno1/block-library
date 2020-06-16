/*!
 * Search post with incremental search
 * wpdeps=kbl-components-incremental-search, wp-api-fetch, wp-hooks
 */

const React = wp.element;
const { __ } = wp.i18n;
const { IncrementalSearch } = kbl;
const { Snackbar } = wp.components;

class PostSearcher extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			searching: false,
			suggestions: [],
			total: 0,
			errorMsg: '',
		};
	}

	render() {
		const { suggestions, total, searching, errorMsg } = this.state;
		const label = this.props.label || __( 'Post Selector', 'kbl' );
		return (
			<>
				<IncrementalSearch suggestions={ suggestions } total={ total } searching={ searching } label={ label }
					onSelect={ ( id ) => {
						if ( this.props.onSelect ) {
							this.props.onSelect( id );
						}
					} }
					onSearch={ ( term ) => {
						this.search( term );
					} }
					onClear={ () => {
						this.setState( {
							total: 0,
							suggestions: [],
							searching: false,
						} );
					} }
				/>
				{ errorMsg && (
					<Snackbar>{ errorMsg }</Snackbar>
				) }
			</>
		);
	}

	search( term ) {
		this.setState( { searching: true }, () => {
			wp.apiFetch( {
				path: 'kbl/v1/search/public/?s=' + encodeURIComponent( term ),
				parse: false,
			} ).then( ( response ) => {
				this.setState( {
					total: parseInt( response.headers.get( 'x-wp-total' ), 10 ),
				} );
				return response.json();
			} ).then( ( suggestions ) => {
				this.setState( { suggestions } );
			} ).catch( () => {
				this.setState( {
					total: 0,
					errorMsg: __( 'Failed to search posts. Please try again later.', 'ku-mag' ),
				}, () => {
					setTimeout( () => {
						this.setState( { errorMsg: '' } );
					}, 3000 );
				} );
			} ).finally( () => {
				this.setState( { searching: false } );
			} );
		} );
	}
}

kbl.PostSearcher = PostSearcher;
