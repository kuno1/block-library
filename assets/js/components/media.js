/*!
 * wpdeps=wp-api-fetch, wp-element, kbl, wp-components
 */

const React = wp.element;
const { __ } = wp.i18n;
const { Spinner } = wp.components;

class MediaWithId extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			loading: true,
			src: '',
			alt: '',
		}
	}

	className( extraClasses ) {
		const classNames = [ 'kbl-image' ];
		if ( this.state.loading ) {
			classNames.push( 'kbl-image-loading' )
		}
		if ( extraClasses ) {
			classNames.push( extraClasses );
		}
		return classNames.join( ' ' );
	}

	extract( media ) {
		let src = media.source_url;
		if ( this.props.size && media.media_details.sizes[ this.props.size ] ) {
			src = media.media_details[ this.props.size ].source_url;
		}
		return src;
	}

	fetch() {
		this.setState( {
			loading: true,
			src: '',
			alt: ''
		}, () => {
			wp.apiFetch( {
				path: 'wp/v2/media/' + this.props.id,
			} ).then( ( res ) => {
				let title = res.title.rendered;
				if ( res.alt_text ) {
					title = res.alt_text;
				}
				this.setState( {
					alt: title,
					src: this.extract( res ),
				} );
			} ).catch( ( res ) => {
				console.log( 'error: %o', res ); // eslint-disable-line no-console
				this.setState( {
					src: '',
					alt: '',
				} );
				if ( this.props.errorHandler ) {
					this.props.errorHandler( __( 'Failed to fetch image.', 'kbl' ) );
				}
			} ).finally( () => {
				this.setState( { loading: false } );
			} );
		} );
	}

	componentDidMount() {
		this.fetch();
	}

	render() {
		if ( ! this.props.id ) {
			return null;
		}
		const { src, loading, alt } = this.state;
		return src && ! loading ? (
			<img className={ this.className( this.props.extraClasses) } src={ src } alt={ alt } />
		) : (
			<div className={ this.className( this.props.extraClasses ) }>
				<Spinner />
			</div>
		);
	}
}

kbl.MediaWithId = MediaWithId;
