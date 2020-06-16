/*!
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components, kbl-components-media, kbl-step
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { G, SVG, Polygon, PanelBody, ToggleControl } = wp.components;

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
			source: 'html',
			selector: '.kbl-step-title',
			default: '',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: '.kbl-step-description',
			default: '',
		},
		nojson: {
			type: 'boolean',
			default: false,
		},
	},

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, className } ) {
		className += ' kbl-step-wrap';
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'How-to Setting', 'kbl' ) } defaultOpen={ true }>
						<ToggleControl checked={ !attributes.nojson } label={ __( 'Generate JSON-LD', 'kbl' ) }
							onChange={ ( nojson ) =>  setAttributes( { nojson: !nojson } ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ className } data-step-type={ attributes.type }>
					<RichText className="kbl-step-title" tagName="h2" multiline={ false }
						keepPlaceholderOnFocus={ true }
						value={ attributes.title } placeholder={ __( 'e.g. How to tie necktie.', 'kbl' ) }
						onChange={ ( title ) => setAttributes( { title } ) } />
					<RichText className="kbl-step-description" tagName="p" multiline={ false }
						value={ attributes.description } placeholder={ __( 'e.g. This article will explain how to tie a necktie.', 'kbl' ) }
						onChange={ ( description) => setAttributes( { description } ) } />
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
				<RichText.Content className="kbl-step-description" tagName="p" value={ attributes.description } multiline={ false } />
				<ol className="kbl-step-list">
					<InnerBlocks.Content />
				</ol>
			</div>
		);
	}
} );
