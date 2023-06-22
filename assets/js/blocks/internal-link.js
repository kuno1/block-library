/*!
 * Internal link
 *
 * wpdeps=kbl-components-post-searcher,kbl-components-post-placeholder,wp-blocks,wp-components,wp-block-editor, wp-compose, wp-server-side-render
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { withState } = wp.compose;
const { PanelBody, TextControl, TextareaControl, Notice, Placeholder, Button } = wp.components;
const { serverSideRender: ServerSideRender } = wp;
const { InspectorControls } = wp.blockEditor;
const { PostPlaceholder, PostSearcher } = kbl;

registerBlockType( 'kunoichi/internal-link', {

	title: __( 'Internal Link', 'kbl' ),

	icon: 'admin-links',

	description: __( 'Same as Oembed link block, but this link is referred as post ID.', 'kbl' ),

	category: 'embed',

	keywords: [ 'Embed', 'Related', 'link', __( 'Related Articles', 'kbl' ) ],

	attributes: {
		id: {
			type: 'number',
			default: 0,
		},
		title: {
			type: 'string',
			default: '',
		},
		excerpt: {
			type: 'string',
			default: '',
		},
	},

	edit: withState( {
		editing: false,
	} )( ( { attributes, className, setAttributes, editing, setState } ) => {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Post Setting', 'kbl' ) } initialOpen={ true }>
						{ ( 0 !== attributes.id ) ? (
							<PostPlaceholder id={ attributes.id } actions={ [
								{
									label: __( 'Remove', 'kbl' ),
									icon: 'no',
									handler: () => {
										setAttributes( { id: 0 } );
									},
								}
							] } />
						) : (
							<Notice status="warning" isDismissible={ false }>
								<p style={ { margin: 0 } }>{ __( 'No post is specified.', 'kbl' ) }</p>
							</Notice>
						) }
						{ ( 0 === attributes.id ) && <>
							<hr />
							<PostSearcher label={ __( 'Search Post', 'kbl' ) } onSelect={ ( id ) => {
								setAttributes( { id } );
							} } />
						</> }
					</PanelBody>
					<PanelBody title={ __( 'Override Setting', 'kbl' ) } initialOpen={ false }>
						<TextControl label={ __( 'Title', 'kbl' ) } value={ attributes.title }
							help={ __( 'If set, title will be overridden.', 'kbl' ) }
							onChange={ ( title ) => setAttributes( { title } ) }
						/>
						<TextareaControl label={ __( 'Excerpt', 'kbl' ) } value={ attributes.excerpt }
							help={ __( 'If set, excerpt will be overridden.', 'kbl' ) }
							onChange={ ( excerpt ) => setAttributes( { excerpt } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					{ ( 0 < attributes.id ) ? (
						<ServerSideRender block="kunoichi/internal-link" attributes={ attributes } />
					) : (
						<Placeholder icon="warning" label={ __( 'No Post Specified.', 'kbl' ) }
							instructions={ __( 'Please specify post to link.', 'kbl' ) } />
					) }
					<div className="kbl-internal-link-filter">
						{ ! editing && (
							<Button isSecondary={ true } className="kbl-internal-link-toggle" icon="welcome-write-blog"
								onClick={ () => {
									setState( { editing: true } )
								} }>
								{ __( 'Edit', 'kbl' ) }
							</Button>
						) }
					</div>
					{ editing && (
						<div className="kbl-internal-link-editor">
							<div className="kbl-intern-link-editor-column">
								<div className="kbl-internal-link-editor-id">
									<TextControl type="number" label={ __( 'Post ID', 'kbl' ) } value={ attributes.id }
										placeholder={ __( 'Post ID', 'kbl' ) } onChange={ ( id ) => {
										setAttributes( {
											id: parseInt( id, 10 ),
										} )
									} } />
								</div>
								<div className="kbl-internal-link-editor-search">
									<PostSearcher label={ __( 'Search Post', 'kbl' ) } onSelect={ ( id ) => {
										setAttributes( { id } );
									} } />
								</div>
								{ ( 0 < attributes.id ) && (
									<Button isSecondary={ true } icon="editor-unlink" onClick={ () => {
										setAttributes( { id: 0 } );
									} }>{ __( 'Reset', 'kbl' ) }</Button>
								) }
							</div>
							<Button className="kbl-internal-link-editor-close" icon="no" label={ __( 'Close', 'kbl' ) }
								onClick={ () => {
									setState( { editing: false } );
								} } />
						</div>
					) }
				</div>
			</>
		);
	} ),

	save() {
		return null;
	}
} );
