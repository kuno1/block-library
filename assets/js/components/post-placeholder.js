/*!
 * Post placeholder
 * wpdeps=kbl-components-placeholder
 */

const React = wp.element;
const { __ } = wp.i18n;
const { ObjectPlaceholder } = kbl;

class PostPlaceholder extends ObjectPlaceholder {
	renderObject() {
		const { data } = this.state;
		return (
			<>
				{ data.img && <img className="kbl-placeholder-img" src={ data.img } alt="" /> }
				<div className="kbl-placeholder-content">
					<div className="kbl-placeholder-title"><strong>{ data.type }</strong> { data.title }</div>
					<div className="kbl-placeholder-meta">
						<span className="kbl-placeholder-value"> { __( 'Post ID', 'kbl' ) }: <strong>{ data.id }</strong></span>
						<span className="kbl-placeholder-value"> { __( 'Date', 'kbl' ) }: <strong>{ data.date }</strong></span>
					</div>
				</div>
			</>
		);
	}

	apiFetch() {
		return wp.apiFetch( {
			path: `kbl/v1/search/any?id=${ this.props.id }`,
		} );
	}

	handleSuccess( response ) {
		const post = response[ 0 ];
		return this.setState( {
			data: {
				id: post.id,
				title: post.title,
				img: post.thumbnail,
				date: post.date_formatted,
				type: post.type_formatted,
			},
		} );
	}

	placeHolder() {
		return {
			id: 0,
			title: __( 'Post Title', 'kbl' ),
			img: null,
			date: '---',
			type: '---',
		};
	}
}

window.kbl.PostPlaceholder = PostPlaceholder;
