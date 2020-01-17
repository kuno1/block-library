/*!
 * wpdeps=wp-blocks, kbl, wp-editor, wp-components, kbl-components-media, kbl-step
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.editor;
const { G, SVG, Polygon, PanelBody, TextControl, TextareaControl } = wp.components;


registerBlockType( 'kunoichi/steps', {

	title: __( 'How-to', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="step">
				<Polygon points="0.75 19.25 0.75 13.08 6.92 13.08 6.92 6.92 13.08 6.92 13.08 0.75 19.25 0.75 19.25 19.25 0.75 19.25" style={ { fill: '#898989', stroke: '#444', strokeMiterlimit:10 } } />
			</G>
		</SVG>
	),

	category: 'formatting',

	description: __( 'Step by step how-tos. Ready for JSON-LD.', 'kbl' ),

	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.kbl-step-title',
			default: '',
		},
	},

	edit( { attributes, setAttributes, className } ) {
		className += ' kbl-step-wrap';
		return (
			<>
				<div className={ className } data-step-type={ attributes.type }>
					<RichText className="kbl-step-title" tagName="h2" multiline={ false }
						keepPlaceholderOnFocus={ true }
						value={ attributes.title } placeholder={ __( 'e.g. How to tie necktie.', 'kbl' ) }
						onChange={ ( title ) => setAttributes( { title } ) } />
					<div className="kbl-step-list">
						<InnerBlocks allowedBlocks={ [ 'kunoichi/step' ] } templateLock={ false } />
					</div>
				</div>
			</>
		);
	},

	save( { attributes } ) {
		return (
			<div className="kbl-step-wrap">
				<RichText.Content className="kbl-step-title" tagName="h2" value={ attributes.title } multiline={ false } />
				<ol className="kbl-step-list">
					<InnerBlocks.Content />
				</ol>
			</div>
		);
	}
} );
