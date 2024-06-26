/*!
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { G, Path, SVG, Rect, PanelBody, ToggleControl } = wp.components;

registerBlockType( 'kunoichi/dt', {

	title: __( 'Term', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="step">
				<Path
					d="M10.34,18.35a5.29,5.29,0,0,0,.9-.07.91.91,0,0,0,.53-.31,1.55,1.55,0,0,0,.25-.66,7.8,7.8,0,0,0,.06-1.08V8.55H9.72a4.39,4.39,0,0,0-1,.09,1.46,1.46,0,0,0-.59.24,1,1,0,0,0-.32.43,3.48,3.48,0,0,0-.2.62l-.09.36H7.15l.16-2.44h11l.16,2.44h-.38L18,9.93a3.48,3.48,0,0,0-.2-.62,1,1,0,0,0-.32-.43,1.47,1.47,0,0,0-.58-.24,4.43,4.43,0,0,0-1-.09H13.53v7.68a7.8,7.8,0,0,0,.06,1.08,1.55,1.55,0,0,0,.25.66.88.88,0,0,0,.52.31,5.43,5.43,0,0,0,.91.07v.38H10.34Z"
					style={ { fill: '#898989' } } />
				<Path
					d="M2,13a4.73,4.73,0,0,0,1-.09,1,1,0,0,0,.6-.35,1.53,1.53,0,0,0,.26-.73A10.33,10.33,0,0,0,4,10.62V4A10.1,10.1,0,0,0,3.9,2.71,1.49,1.49,0,0,0,3.64,2,1,1,0,0,0,3,1.65a5.58,5.58,0,0,0-1-.08V1.14H7.58a9,9,0,0,1,3.09.48A5.57,5.57,0,0,1,12.8,3a5.09,5.09,0,0,1,1.23,2,6.93,6.93,0,0,1,.4,2.39A7,7,0,0,1,14,9.69a5.09,5.09,0,0,1-1.23,2A5.68,5.68,0,0,1,10.67,13a8.71,8.71,0,0,1-3.09.49H2ZM7.6,12.7A5.11,5.11,0,0,0,10,12.19a4,4,0,0,0,1.49-1.29,4.8,4.8,0,0,0,.74-1.74,9.2,9.2,0,0,0,0-3.72,4.77,4.77,0,0,0-.74-1.75A4.19,4.19,0,0,0,10,2.4,5.24,5.24,0,0,0,7.6,1.9h-2v8.42a10.26,10.26,0,0,0,.06,1.23,1.53,1.53,0,0,0,.26.73,1,1,0,0,0,.58.34,5.26,5.26,0,0,0,1,.08Z"
					style={ { fill: '#231815' } } />
			</G>
		</SVG>
	),

	category: 'common',

	description: __( 'Definition Term.', 'kbl' ),

	parent: [ 'kunoichi/definition-list' ],

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.kbl-dl-term',
		},
	},

	edit( { attributes, setAttributes } ) {
		return (
			<RichText tagName={ 'p' } className="kbl-dl-term"
				placeholder={ __( 'Enter term name.', 'kbl' ) }
				value={ attributes.content } onChange={ ( content ) => setAttributes( { content } ) } />
		);
	},

	save( { attributes } ) {
		return <RichText.Content tagName="dt" className="kbl-dl-term" value={ attributes.content } />;
	},
} );

registerBlockType( 'kunoichi/dd', {

	title: __( 'Description', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="step">
				<Path
					d="M7,18a4.73,4.73,0,0,0,1-.09,1,1,0,0,0,.6-.35,1.53,1.53,0,0,0,.26-.74A10,10,0,0,0,9,15.62V9A10.1,10.1,0,0,0,8.9,7.71,1.49,1.49,0,0,0,8.64,7,1,1,0,0,0,8,6.65a5.58,5.58,0,0,0-1-.08V6.14h5.57a9,9,0,0,1,3.09.48A5.68,5.68,0,0,1,17.8,7.94a5.21,5.21,0,0,1,1.23,2,6.93,6.93,0,0,1,.4,2.39,7,7,0,0,1-.4,2.39,5.09,5.09,0,0,1-1.23,2A5.68,5.68,0,0,1,15.67,18a8.71,8.71,0,0,1-3.09.49H7Zm5.59-.33A5.11,5.11,0,0,0,15,17.19a4,4,0,0,0,1.49-1.29,4.8,4.8,0,0,0,.74-1.74,9.2,9.2,0,0,0,0-3.72,4.77,4.77,0,0,0-.74-1.75A4.19,4.19,0,0,0,15,7.4a5.24,5.24,0,0,0-2.44-.5h-2v8.42a10.26,10.26,0,0,0,.06,1.23,1.57,1.57,0,0,0,.26.73,1,1,0,0,0,.58.33,4.46,4.46,0,0,0,1,.09Z"
					style={ { fill: '#898989' } } />
				<Path
					d="M2,13a4.73,4.73,0,0,0,1-.09,1,1,0,0,0,.6-.35,1.53,1.53,0,0,0,.26-.74A10,10,0,0,0,4,10.62V4A10.1,10.1,0,0,0,3.9,2.71,1.49,1.49,0,0,0,3.64,2,1,1,0,0,0,3,1.65a5.58,5.58,0,0,0-1-.08V1.14H7.58a9,9,0,0,1,3.09.48A5.68,5.68,0,0,1,12.8,2.94a5.21,5.21,0,0,1,1.23,2,6.93,6.93,0,0,1,.4,2.39A7,7,0,0,1,14,9.69a5.09,5.09,0,0,1-1.23,2A5.68,5.68,0,0,1,10.67,13a8.71,8.71,0,0,1-3.09.49H2ZM7.6,12.7A5.11,5.11,0,0,0,10,12.19a4,4,0,0,0,1.49-1.29,4.8,4.8,0,0,0,.74-1.74,9.2,9.2,0,0,0,0-3.72,4.77,4.77,0,0,0-.74-1.75A4.19,4.19,0,0,0,10,2.4,5.24,5.24,0,0,0,7.6,1.9h-2v8.42a10.26,10.26,0,0,0,.06,1.23,1.57,1.57,0,0,0,.26.73,1,1,0,0,0,.58.33,4.46,4.46,0,0,0,1,.09Z"
					style={ { fill: '#231815' } } />
			</G>
		</SVG>
	),

	category: 'common',

	description: __( 'Definition Description.', 'kbl' ),

	parent: [ 'kunoichi/definition-list' ],

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.kbl-dl-description',
		},
	},

	edit( { attributes, setAttributes } ) {
		return (
			<RichText tagName={ 'p' } className="kbl-dl-description"
				placeholder={ __( 'Enter description here.', 'kbl' ) }
				value={ attributes.content } onChange={ ( content ) => setAttributes( { content } ) } />
		);
	},

	save( { attributes } ) {
		return <RichText.Content tagName="dd" className="kbl-dl-description" value={ attributes.content } />;
	},
} );

registerBlockType( 'kunoichi/definition-list', {

	title: __( 'Definition List', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="step">
				<Rect x="1.5" y="2.5" width="16.5" height="2"
					style={ { fill: '#898989', stroke: '#444', strokeMiterlimit: 10 } } />
				<Rect x="4.8" y="6.5" width="13.2" height="2"
					style={ { fill: '#fff', stroke: '#444', strokeMiterlimit: 10 } } />
				<Rect x="1.5" y="10.5" width="16.5" height="2"
					style={ { fill: '#898989', stroke: '#444', strokeMiterlimit: 10 } } />
				<Rect x="4.8" y="14.5" width="13.2" height="2"
					style={ { fill: '#fff', stroke: '#444', strokeMiterlimit: 10 } } />
			</G>
		</SVG>
	),

	category: 'formatting',

	description: __( 'Definition list.', 'kbl' ),

	attributes: {
		faq: {
			type: 'boolean',
			default: false,
		},
	},

	edit( { className, attributes, setAttributes } ) {
		const allowedBlocks = [ 'kunoichi/dt', 'kunoichi/dd' ];
		className += ' kbl-dl';
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Definition List Setting', 'kbl' ) } defaultOpen={ true }>
						<ToggleControl checked={ attributes.faq } label={ __( 'Display as FAQ', 'kbl' ) }
							onChange={ ( faq ) => setAttributes( { faq } ) }
							help={ __( 'If checked, JSON-LD will be generated.', 'kbl' ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ className } data-faq={ attributes.faq ? 'faq' : 'dl' }>
					<InnerBlocks allowedBlocks={ allowedBlocks } templateLock={ false } />
				</div>
			</>
		);
	},

	save( { attributes } ) {
		return (
			<dl className="kbl-dl" data-faq={ attributes.faq ? 'faq' : 'dl' }>
				<InnerBlocks.Content />
			</dl>
		);
	},

} );
