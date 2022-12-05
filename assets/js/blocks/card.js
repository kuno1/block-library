/*!
 * wpdeps=wp-blocks, kbl, wp-block-editor, kbl, wp-components, wp-compose
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { withState } = wp.compose;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, AlignmentToolbar, BlockControls, URLInputButton } = wp.blockEditor;
const { G, Path, SVG, PanelBody, TextControl } = wp.components;

/* global KblLinkCard: false */

const setClassName = ( className, attributes ) => {
	let classes = 'kbl-link-card';
	if ( className ) {
		classes += ' ' + className;
	}
	if ( attributes.textAlign ) {
		classes += ` has-text-align-${ attributes.textAlign }`
	}
	return classes;
};

registerBlockType( 'kunoichi/card', {

	title: __( 'Link Card', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="step">
				<line x1="1" y1="18" x2="19" y2="18"
					style={ { fill: 'none', stroke: '#231815', strokeMiterlimit: 10 } } />
				<Path
					d="M19,14.62a1.52,1.52,0,0,1-1.51,1.51H2.35A1.52,1.52,0,0,1,.84,14.62V3.11A1.52,1.52,0,0,1,2.35,1.6H17.49A1.52,1.52,0,0,1,19,3.11ZM2.35,2.81a.31.31,0,0,0-.3.3V14.62a.31.31,0,0,0,.3.3H17.49a.31.31,0,0,0,.3-.3V3.11a.31.31,0,0,0-.3-.3ZM5.08,7.65A1.82,1.82,0,1,1,6.89,5.84,1.81,1.81,0,0,1,5.08,7.65Zm11.5,6.06H3.26V11.89l3-3L7.8,10.38l4.85-4.85,3.93,3.94Z"
					style={ { fill: '#9fa0a0' } } />
			</G>
		</SVG>
	),

	category: 'common',

	description: __( 'Card style link.', 'kbl' ),

	parent: [ 'kunoichi/cards' ],

	attributes: {
		text: {
			type: 'array',
			default: '',
			source: 'children',
			selector: '.kbl-link-card-text',
		},
		url: {
			type: 'string',
			default: '',
			source: 'attribute',
			attribute: 'href',
			selector: '.kbl-link-card-anchor'
		},
		src: {
			type: 'string',
			default: '',
			source: 'attribute',
			attribute: 'src',
			selector: '.kbl-link-card-img',
		},
		textAlign: {
			type: 'string',
			default: 'center',
		},
	},

	edit: withState( {
		linkEdit: false,
	} )( ( { attributes, setAttributes, className } ) => {
		const mediaSrc = attributes.src || KblLinkCard.default_src;
		return (
			<>
				<BlockControls>
					<div className="components-toolbar kbl-link-card-edit-link">
						<URLInputButton url={ attributes.url } onChange={ ( url ) => setAttributes( { url } ) } />
					</div>
					<AlignmentToolbar
						value={ attributes.textAlign }
						onChange={ ( textAlign ) => {
							setAttributes( { textAlign } );
						} }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Link Setting', 'kbl' ) }>
						<TextControl type="url" value={ attributes.url } label={ __( 'Link URL', 'kbl' ) }
							onChange={ ( url ) => setAttributes( { url } ) } />
						<TextControl type="url" value={ attributes.src } label={ __( 'Image URL', 'kbl' ) }
							onChange={ ( src ) => setAttributes( { src } ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ setClassName( className, attributes ) }>
					<div className="kbl-link-card-anchor">
						<MediaUploadCheck>
							<MediaUpload onSelect={ ( media ) => {
								let src = media.url;
								if ( KblLinkCard.size && media.sizes[ KblLinkCard.size ] ) {
									src = media.sizes[ KblLinkCard.size ].url;
								}
								setAttributes( { src } );
							} } allowedTypes={ [ 'image' ] } render={ ( { open } ) => {
								/* eslint-disable jsx-a11y/click-events-have-key-events */
								/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
								return (
									<img src={ mediaSrc } alt="" style={ { cursor: 'pointer' } }
										title={ __( 'Click to change image.', 'kbl' ) } className="kbl-link-card-img"
										onClick={ () => open() } tabIndex={ 0 } />
								)
							} } />
						</MediaUploadCheck>
						<RichText tagName="p" multiline={ false } value={ attributes.text }
							className="kbl-link-card-text"
							onChange={ ( text ) => setAttributes( { text } ) }
							placeholder={ __( 'e.g. Category Name', 'kbl' ) } keepPlaceholderOnFocus={ true }
						/>
					</div>
				</div>
			</>
		);
	} ),

	save( { attributes } ) {
		return (
			<figure className={ setClassName( "", attributes ) }>
				<a className="kbl-link-card-anchor" href={ attributes.url }>
					<img src={ attributes.src || KblLinkCard.default_src } alt="" className="kbl-link-card-img" />
					<RichText.Content value={ attributes.text } multiline={ false } className="kbl-link-card-text"
						tagName="p" />
				</a>
			</figure>
		);
	},
} );
