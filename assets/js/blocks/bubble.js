/*!
 * wpdeps=wp-blocks,kbl,wp-editor, wp-components, wp-api-fetch, kbl-components-user-selector, kbl-components-post-selector
 */

/* global KblBubble:false */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { RichText, withColors, InspectorControls, PanelColorSettings, MediaUpload, MediaUploadCheck } = wp.editor;
const { Button, PanelBody, SelectControl, TextControl } = wp.components;
const { withState } = wp.compose;
const { UserSelector, PostSelector } = kbl;

const userResults = {};
const postResults = {};

const extractAvatar = ( image ) => {
	let src = '';
	for ( let size of [ 'thumbnail', KblBubble.size ] ) {
		if ( image.sizes[ size ] ) {
			src = image.sizes[ size ].url;
		}
	}
	return src;
};

const displayError = ( message, style = 'success' ) => {
	wp.data.dispatch( 'core/notices' ).createNotice( style, message, {
		isDismissible: true,
	} );
};

const setNameAndImage = ( attributes, setState ) => {

};

registerBlockType( 'kunoichi/bubble', {

	title: __( 'Speech Bubble', 'kbl' ),

	icon: 'format-chat',

	category: 'layout',

	description: __( 'Speech bubble with avatar.', 'kbl' ),

	attributes: {
		position: {
			type: 'string',
			default: 'left',
		},
		name: {
			type: 'string',
			default: '',
		},
		avatar: {
			type: 'string',
			default: '',
		},
		writer: {
			type: 'integer',
			default: 0,
		},
		user: {
			type: 'integer',
			default: 0,
		},
		textColor: {
			'type': 'string',
			default: '',
		},
		backgroundColor: {
			'type': 'string',
			default: '',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: 'p'
		}
	},

	edit: withState( {
		src: KblBubble.avatar,
		name: '',
	} )( withColors( 'backgroundColor', 'textColor' )( ( { attributes, setAttributes, className, backgroundColor, setBackgroundColor, textColor, setTextColor, name, src, setState } ) => {
		const newState = {
			name: '',
			avatar: KblBubble.avatar,
		};
		// If attributes are set, assign them.
		if ( attributes.name ) {
			newState.name = attributes.name;
		}
		if ( attributes.avatar ) {
			newState.src = attributes.avatar;
		}
		if ( attributes.user ) {
			// If user is set, try to get it.
			const userCache = userResults[ attributes.user ];
			if ( userCache ) {
				newState.name = attributes.name ? attributes.name : userCache.display_name;
				newState.src  = attributes.avatar ? attributes.avatar : userCache.avatar;
			} else {
				wp.apiFetch( {
					path: sprintf( 'kbl/v1/users/search?id=%d', attributes.user ),
				} ).then( res => {
					if ( ! res.length ) {
						// User not found.
						setAttributes( { user: 0 } );
						displayError( __( 'User not found.', 'kbl' ), 'error' );
					} else {
						setState( {
							name: attributes.name ? attributes.name : res[ 0 ].display_name,
							src: attributes.avatar ? attributes.avatar : res[ 0 ].avatar,
						} );
						userResults[ attributes.user ] = res[ 0 ];
					}
				} ).catch( res => {
					let message = __( 'Error', 'kbl' );
					if ( res.responseJSON && res.responseJSON.message ) {
						message = res.responseJSON.message;
					}
					displayError( message, 'error' );
				} );
			}
		} else if ( attributes.writer ) {
			// If writer is set, try to get it.
			// If user is set, try to get it.
			const postCache = postResults[ attributes.writer ];
			if ( postCache ) {
				newState.name = attributes.name ? attributes.name : postCache.title;
				newState.src  = attributes.avatar ? attributes.avatar : postCache.thumbnail;
			} else {
				wp.apiFetch( {
					path: sprintf( 'kbl/v1/search/%s?id=%d', KblBubble.virtual_member, attributes.writer ),
				} ).then( ( res ) => {
					if ( ! res.length ) {
						// User not found.
						setAttributes( { writer: 0 } );
						displayError( __( 'Post not found.', 'kbl' ), 'error' );
					} else {
						setState( {
							name: attributes.name ? attributes.name : res[ 0 ].title,
							src: attributes.avatar ? attributes.avatar : res[ 0 ].thumbnail,
						} );
						postResults[ attributes.writer ] = res[ 0 ];
					}
				} ).catch( res => {
					let message = __( 'Error', 'kbl' );
					if ( res.responseJSON && res.responseJSON.message ) {
						message = res.responseJSON.message;
					}
					displayError( message, 'error' );
				} );
			}
		}
		setState( newState );
		const colorSettings = [
			{
				value: textColor.color,
				label: __( 'Text Color', 'kbl' ),
				onChange: setTextColor,
			},
			{
				value: backgroundColor.color,
				label: __( 'Background Color', 'kbl' ),
				onChange: setBackgroundColor,
			},
		];
		const bodyClasses = [ 'kbl-bubble-text' ];
		const bodyStyle = {};
		if ( backgroundColor.class ) {
			bodyClasses.push( backgroundColor.class )
		} else if ( backgroundColor.color ) {
			bodyStyle.backgroundColor = backgroundColor.color;
		}
		if ( textColor.class ) {
			bodyClasses.push( textColor.class );
		} else if ( textColor.color ) {
			bodyStyle.color = textColor.color;
		}
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Speaker', 'kbl' ) } initialOpen={true}>
						<TextControl label={ __( 'Name', 'kbl' ) } value={ attributes.name }
									 help={ __( 'If name is empty, this will be just omitted.', 'kbl' ) }
									 onChange={ name => setAttributes( { name } ) } />
						<MediaUploadCheck>
							<MediaUpload allowedTypes={['image']}
										 onSelect={ select => { setAttributes( { avatar: extractAvatar( select ) } ) } }
										 render={ ( { open } ) => { return (
								<>
									<Button isDefault={ true } onClick={ open }>{ __( 'Select Avatar', 'kbl' ) }</Button>
									{ attributes.avatar && <Button style={ { marginLeft: '10px'} } isLink={ true } onClick={ () => setAttributes( { avatar: '' } ) }>{ __( 'Clear Avatar', 'kbl' ) }</Button> }
								</>
							); }}/>
						</MediaUploadCheck>
						<hr />
						<UserSelector id={ attributes.user } currentLabel={ __( 'Current User', 'kbl' ) } label={ __( 'Search from WordPress users', 'kbl' ) }
									  onChange={ ( user ) => setAttributes( { user, writer: 0 } ) } />
						{ KblBubble.virtual_member && (
							<>
								<hr />
								<PostSelector id={ attributes.writer } postType={ KblBubble.virtual_member }
									currentLabel={ sprintf( __( 'Current %s', 'kbl' ), KblBubble.virtual_member_label ) }
									label={ sprintf( __( 'Search from %s', 'kbl' ), KblBubble.virtual_member_label ) }
									onChange={ ( writer ) => setAttributes( { writer, user: 0 } ) } />
							</>
						) }

					</PanelBody>
					<PanelBody title={ __( 'Layout', 'kbl' ) } initialOpen={false}>
						<SelectControl
							label={ __( 'Position', 'kbl' ) }
							value={ attributes.position }
							options={ [
								{ label: __( 'Left', 'kbl' ), value: 'left' },
								{ label: __( 'Right', 'kbl' ), value: 'right' },
							] }
							onChange={ position => { setAttributes( { position } ) } }
						/>
					</PanelBody>
					<PanelColorSettings title={ __( 'Color Setting', 'kbl' ) } colorSettings={ colorSettings } initialOpen={false} />
				</InspectorControls>
				<div className='kbl-bubble' data-position={attributes.position}>
					{src ? (
						<div className='kbl-bubble-avatar'>
							<img className='kbl-bubble-image' src={src} alt={name} width={96} height={96}/>
							{ name.length ? (
								<span className='kbl-bubble-name'>{ name }</span>
							) : null }
						</div>
					) : null}
					<div className='kbl-bubble-body'>
						<RichText className={ bodyClasses.join( ' ' ) } style={ bodyStyle || null }
								  tagName={'p'} value={attributes.content}
								  onChange={content => setAttributes({content})}/>
					</div>
				</div>
			</>
		);
	}) ),

	save({attributes}) {
		return (
			<div className='kbl-bubble-body'>
				<RichText.Content tagName='p' className='kbl-bubble-text' value={attributes.content}/>
			</div>
		)
	}
} );