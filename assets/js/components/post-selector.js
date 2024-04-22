/*!
 * User selector
 * wpdeps=kbl-components-object-selector
 */

const { __, sprintf } = wp.i18n;
const { ObjectSelector } = kbl;
const { Button } = wp.components;

class PostSelector extends ObjectSelector {
	fetch( id ) {
		this.setState( { loading: true }, () => {
			wp.apiFetch( {
				path: sprintf( 'kbl/v1/search/%1$s?id=%2$d', this.postType(), id ),
			} ).then( ( res ) => {
				if ( res.length ) {
					this.setState( {
						object: res[ 0 ],
					} );
				} else {
					throw new Error( 'Post not found.' );
				}
			} ).catch( () => {
				// Error.
				this.handleChange( 0 );
			} ).finally( () => {
				this.setState( { loading: false } );
			} );
		} );
	}

	search() {
		this.setState( {
			searching: true,
		}, () => {
			wp.apiFetch( {
				path: sprintf( 'kbl/v1/search/%1$s?s=%2$s', this.postType(), this.state.term ),
			} ).then( ( founds ) => {
				this.setState( {
					founds,
				} );
				if ( ! founds.length ) {
					this.notice( __( 'No post found.', 'kbl' ), 'error' );
				}
			} ).catch( ( res ) => {
				this.notice( res.message, 'error' );
			} ).finally( () => {
				this.setState( { searching: false } );
			} );
		} );
	}

	postType() {
		return this.props.postType || 'post';
	}

	renderObject( post, adding = true ) {
		return (
			<div ref={ post.id } className="kbl-user">
				<img src={ post.thumbnail } className="kbl-user-avatar" alt="" />
				<span className="kbl-user-name">{ post.title }</span>
				{ adding ? (
					<Button isLink={ true } onClick={ () => this.setCurrent( post ) }>
						{ __( 'Choose', 'kbl' ) }
					</Button>
				) : (
					<Button isLink={ true } onClick={ () => this.setCurrent( null ) }>
						{ __( 'Remove', 'kbl' ) }
					</Button>
				) }
			</div>
		);
	}
}

window.kbl.PostSelector = PostSelector;

