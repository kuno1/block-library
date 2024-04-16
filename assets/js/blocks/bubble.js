/*!
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-element, wp-api-fetch, kbl-components-user-selector, kbl-components-post-selector
 */

/* global KblBubble:false */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { RichText, withColors, InspectorControls, PanelColorSettings, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl } = wp.components;
const { useState } = wp.element;
const { UserSelector, PostSelector } = kbl;

const userResults = {};
const postResults = {};

/**
 * Extract avatar URL from image object.
 *
 * @param {Object} image
 * @return {string} URL of an image.
 */
const extractAvatar = ( image ) => {
	let src = '';
	for ( const size of [ 'thumbnail', KblBubble.size ] ) {
		if ( image.sizes[ size ] ) {
			src = image.sizes[ size ].url;
		}
	}
	return src;
};

/**
 * Display error message.
 *
 * @param {string} message Error message.
 * @param {string} style   Style of notice.
 */
const displayError = ( message, style = 'success' ) => {
	wp.data.dispatch( 'core/notices' ).createNotice( style, message, {
		isDismissible: true,
	} );
};

registerBlockType( 'kunoichi/bubble', {

	title: __( 'Speech Bubble', 'kbl' ),

	icon: 'format-chat',

	category: 'formatting',

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
			type: 'string',
			default: '',
		},
		backgroundColor: {
			type: 'string',
			default: '',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.kbl-bubble-text'
		}
	},

	edit: withColors( 'backgroundColor', 'textColor' )( ( { attributes, setAttributes, backgroundColor, setBackgroundColor, textColor, setTextColor } ) => {
		const[ src, setSrc ] = useState( KblBubble.avatar );
		const [ name, setName ] = useState( '' );
		let displayName = name;
		let imageSrc = src;
		if ( attributes.user ) {
			// If user is set, try to get it if cache doesn't exist.
			const userCache = userResults[ attributes.user ];
			if ( userCache ) {
				displayName = userCache.display_name;
				imageSrc = userCache.avatar;
			} else {
				wp.apiFetch( {
					path: sprintf( 'kbl/v1/users/search?id=%d', attributes.user ),
				} ).then( res => {
					if ( ! res.length ) {
						// User not found.
						setAttributes( { user: 0 } );
						displayError( __( 'User not found.', 'kbl' ), 'error' );
					} else {
						userResults[ attributes.user ] = res[ 0 ];
						setName( res[0].display_name );
						setSrc( res[ 0 ].avatar );
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
			// If writer is set, try to get it if cache doesn't exist.
			const postCache = postResults[ attributes.writer ];
			if ( postCache ) {
				displayName = postCache.title;
				imageSrc = postCache.thumbnail;
			} else {
				wp.apiFetch( {
					// translators: %1$s is slug, %2$d is user id.
					path: sprintf( 'kbl/v1/search/%1$s?id=%2$d', KblBubble.virtual_member, attributes.writer ),
				} ).then( ( res ) => {
					if ( ! res.length ) {
						// User not found.
						setAttributes( { writer: 0 } );
						displayError( __( 'Post not found.', 'kbl' ), 'error' );
					} else {
						postResults[ attributes.writer ] = res[ 0 ];
						setName( attributes.name ? attributes.name : res[ 0 ].title );
						setSrc( attributes.avatar ? attributes.avatar : res[ 0 ].thumbnail );
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
		// If name or avatar attributes are set, assign them and override all.
		if ( attributes.name.length ) {
			displayName = attributes.name;
		}
		if ( attributes.avatar ) {
			imageSrc = attributes.avatar;
		}
		// Color and style Settings.
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
					<PanelBody title={ __( 'Speaker', 'kbl' ) } initialOpen={ true }>
						<hr style={ { marginTop: 0 } } />
						<h4 className="kbl-user-heading">
							{ __( 'Input Directly', 'kbl' ) }
						</h4>
						<TextControl label={ __( 'Name', 'kbl' ) } value={ attributes.name }
							help={ __( 'If name is empty, this will be just omitted.', 'kbl' ) }
							onChange={ newName => setAttributes( { name: newName } ) } />
						<MediaUploadCheck>
							<MediaUpload allowedTypes={ [ 'image' ] }
								onSelect={ select => {
									setAttributes( { avatar: extractAvatar( select ) } )
								} }
								render={ ( { open } ) => {
									return (
										<>
											<Button isSecondary={ true }
												onClick={ open }>{ __( 'Select Avatar', 'kbl' ) }</Button>
											{ attributes.avatar &&
											<Button style={ { marginLeft: '10px' } } isLink={ true }
												onClick={ () => setAttributes( { avatar: '' } ) }>{ __( 'Clear Avatar', 'kbl' ) }</Button> }
										</>
									);
								} } />
						</MediaUploadCheck>
						<hr />
						<UserSelector id={ attributes.user } currentLabel={ __( 'Specify WordPress User', 'kbl' ) }
							label={ __( 'Search from WordPress users', 'kbl' ) }
							onChange={ ( user ) => setAttributes( { user, writer: 0 } ) } />
						{ KblBubble.virtual_member && (
							<>
								<hr />
								<PostSelector id={ attributes.writer } postType={ KblBubble.virtual_member }
									currentLabel={ sprintf( /* translators: %s is label. */ __( 'Specify %s', 'kbl' ), KblBubble.virtual_member_label ) }
									label={ sprintf( /* translators: %s is label. */ __( 'Search from %s', 'kbl' ), KblBubble.virtual_member_label ) }
									onChange={ ( writer ) => setAttributes( { writer, user: 0 } ) } />
							</>
						) }

					</PanelBody>
					<PanelBody title={ __( 'Layout', 'kbl' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Position', 'kbl' ) }
							value={ attributes.position }
							options={ [
								{ label: __( 'Left', 'kbl' ), value: 'left' },
								{ label: __( 'Right', 'kbl' ), value: 'right' },
							] }
							onChange={ position => {
								setAttributes( { position } )
							} }
						/>
					</PanelBody>
					<PanelColorSettings title={ __( 'Color Setting', 'kbl' ) } colorSettings={ colorSettings }
						initialOpen={ false } />
				</InspectorControls>
				<div className='kbl-bubble' data-position={ attributes.position }>
					{ imageSrc ? (
						<div className='kbl-bubble-avatar'>
							<img className='kbl-bubble-image' src={ imageSrc } alt={ displayName } width={ 96 } height={ 96 } />
							{ displayName.length ? (
								<span className='kbl-bubble-name'>{ displayName }</span>
							) : null }
						</div>
					) : null }
					<div className='kbl-bubble-body'>
						<RichText className={ bodyClasses.join( ' ' ) } style={ bodyStyle || null }
							tagName={ 'p' } value={ attributes.content }
							placeholder={ __( 'Enter speech here.', 'kbl' ) }
							onChange={ content => setAttributes( { content } ) } />
					</div>
				</div>
			</>
		);
	} ),

	save( { attributes } ) {
		return (
			<div className='kbl-bubble-body'>
				<RichText.Content tagName='p' className='kbl-bubble-text' value={ attributes.content } />
			</div>
		)
	}
} );
