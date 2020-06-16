/*!
 * User selector
 * wpdeps=kbl-components-object-selector
 */

const { __ } = wp.i18n;
const { ObjectSelector } = kbl;
const { Button } = wp.components;

class UserSelector extends ObjectSelector {

	fetch( id ) {
		this.setState( { loading: true }, () => {
			wp.apiFetch( {
				path: `kbl/v1/users/search?id=${ id }`
			} ).then( ( res ) => {
				if ( res.length ) {
					this.setState( {
						object: res[ 0 ],
					} );
				} else {
					throw new Error( 'User not found.' );
				}
			} ).catch( () => {
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
				path: `kbl/v1/users/search?s=${ this.state.term }`
			} ).then( ( userFound ) => {
				this.setState( {
					founds: userFound,
				} );
				if ( ! userFound.length ) {
					this.notice( __( 'No user found.', 'kbl' ), 'error' );
				}
			} ).catch( ( res ) => {
				// Error.
				this.notice( res.message, 'error' );
			} ).finally( () => {
				this.setState( { searching: false } );
			} );
		} );
	}

	renderObject( object, adding = true ) {
		return (
			<div ref={ object.id } className="kbl-user">
				<img src={ object.avatar } className="kbl-user-avatar" alt="" />
				<span className="kbl-user-name">{ object.display_name }</span>
				{ adding ? (
					<Button isLink={ true } onClick={ () => this.setCurrent( object ) }>
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

window.kbl.UserSelector = UserSelector;
