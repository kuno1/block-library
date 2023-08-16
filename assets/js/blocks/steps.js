/*!
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components, kbl-components-media, kbl-step
 */

const { registerBlockType } = wp.blocks;
const { __, _n, sprintf } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { G, SVG, Polygon, PanelBody, ToggleControl, TextControl, TextareaControl } = wp.components;
const { nl2li } = kbl;

/**
 * Convert multiline text to list items.
 *
 * @param {string} text
 * @param {string} label
 * @param {string} className
 * @return {Array} List items.
 */
const textList = ( text, label, className = '' ) => {
	if ( text.length < 1 ) {
		return [];
	}
	return (
		<div className={ className }>
			<h3>{ label }</h3>
			<ol>
				{ nl2li( text ) }
			</ol>
		</div>
	);
};

/**
 * Convert duration string to ISO 8601 duration.
 *
 * @param {string} d
 * @return {*} HTML element.
 */
const duration = ( d ) => {
	if ( d.length < 1 ) {
		return null;
	}
	// translators: %d is a number of minutes.
	let format = __( '%d min.', 'kbl' );
	let number = d;
	if ( d.match( /\d+d$/ ) ) {
		// Days.
		number = Math.ceil( parseInt( d, 10 ) / 24 / 60 );
		// translators: %d is a number of day.
		format = _n( '%d day', '%d days', number, 'kbl' );
	}
	return sprintf( format, number );
};

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
		totalTime: {
			type: 'string',
			default: '',
		},
		supplies: {
			type: 'string',
			default: '',
		},
		tools: {
			type: 'string',
			default: '',
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
						<TextControl label={ __( 'Total Time', 'kbl' ) }
							help={ __( 'A digit in minutes. 30d will be considered as days. Only minutes(no unit) and days(**d) are supported.', 'kbl' ) }
							value={ attributes.totalTime }
							onChange={ ( totalTime ) => setAttributes( { totalTime } ) }
						/>
						<TextareaControl label={ __( 'Materials', 'kbl' ) }
							help={ __( 'Enter materials or ingredients for this How-to. Enter 1 in each line.', 'kbl' ) }
							value={ attributes.supplies }
							onChange={ ( supplies ) => setAttributes( { supplies } ) }
						/>
						<TextareaControl label={ __( 'Tools', 'kbl' ) }
							help={ __( 'Enter tools required for this How-to. Enter 1 in each line.', 'kbl' ) }
							value={ attributes.tools }
							onChange={ ( tools ) => setAttributes( { tools } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className } data-step-type={ attributes.type }>
					<RichText className="kbl-step-title" tagName="h2" multiline={ false }
						value={ attributes.title } placeholder={ __( 'e.g. How to tie necktie.', 'kbl' ) }
						onChange={ ( title ) => setAttributes( { title } ) } />
					{ 0 < attributes.totalTime.length && (
						<div className="kbl-step-total-time">{ __( 'Total Time: ', 'kbl' ) } { duration( attributes.totalTime ) }</div>
					) }
					{ textList( attributes.supplies, __( 'Materials', 'kbl' ), 'kbl-step-supplies' ) }
					{ textList( attributes.tools, __( 'Tools', 'kbl' ), 'kbl-step-tools' ) }
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
				{ 0 < attributes.totalTime.length && (
					<div className="kbl-step-total-time">{ __( 'Total Time: ', 'kbl' ) } { duration( attributes.totalTime ) }</div>
				) }
				{ textList( attributes.supplies, __( 'Materials', 'kbl' ), 'kbl-step-supplies' ) }
				{ textList( attributes.tools, __( 'Tools', 'kbl' ), 'kbl-step-tools' ) }
				<ol className="kbl-step-list">
					<InnerBlocks.Content />
				</ol>
			</div>
		);
	}
} );
