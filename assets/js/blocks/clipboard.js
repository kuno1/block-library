/*!
 * Clipboard blocks.
 *
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components
 */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { InspectorControls, AlignmentToolbar, RichText } = wp.blockEditor;
const { PanelBody } = wp.components;

registerBlockType( 'kunoichi/clipboard', {

	title: __( 'Clipboard', 'kbl' ),

	icon: 'clipboard',

	category: 'embed',

	description: __( 'Clipboard button for copying text.', 'kbl' ),

	attributes: {
		alignment: {
			type: 'string',
			default: 'none',
		},
		label: {
			type: 'string',
			source: 'html',
			selector: '.kbl-clipboard-label',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.kbl-clipboard-content',
		},
	},

	edit( { attributes, setAttributes, className } ) {
		className += sprintf( ' kbl-clipboard text-%1$s has-text-align-%1$s', attributes.alignment );
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Setting', 'kbl' ) }>
						<p>{ __( 'Alignment', 'clinics' ) }</p>
						<AlignmentToolbar
							value={ attributes.alignment }
							onChange={ ( alignment ) => setAttributes( { alignment } ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<div className="kbl-clipboard-button">
						<span className="kbl-clipboard-icon" />
						<RichText value={ attributes.label } className="kbl-clipboard-label" tagName="div"
							keepPlaceholderOnFocus={ true }
							onChange={ ( label ) => setAttributes( { label } ) }
							placeholder={ __( 'e.g. Click to Copy', 'kbl' ) } />
					</div>
					<RichText value={ attributes.content } tagName="div" className="kbl-clipboard-content"
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Enter text to copy.', 'kbl' ) } />
				</div>
			</>
		);
	},

	save( { attributes, className } ) {
		className += sprintf( ' kbl-clipboard text-%1$s has-text-align-%1$s', attributes.alignment );
		return (
			<div className={ className }>
				<button className="kbl-clipboard-button">
					<span className="kbl-clipboard-icon" />
					<span className="kbl-clipboard-label">{ attributes.label }</span>
				</button>
				<RichText.Content value={ attributes.content } tagName="div" className="kbl-clipboard-content"
					style={ { display: 'none' } } aria-label={ __( 'Text to be copied.', 'kbl' ) } />
			</div>
		);
	},

} );
