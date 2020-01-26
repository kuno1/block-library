/*!
 * Call To Action block.
 *
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, wp-api-fetch, kbl-components-checkbox-group
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InspectorControls } = wp.blockEditor;
const { ServerSideRender, PanelBody, SelectControl, TextControl, CheckboxControl, SVG, Rect, Path, Polygon } = wp.components;
const { CheckboxGroup } = kbl;

registerBlockType( 'kunoichi/cta', {

	title: __( 'Call To Action', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<Rect x="2.5" y="2.5" width="15" height="8" rx="2.5" style={ { fill:'#b3b3b4' } }/>
			<Path d="M15,3a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H5A2,2,0,0,1,3,8V5A2,2,0,0,1,5,3H15m0-1H5A3,3,0,0,0,2,5V8a3,3,0,0,0,3,3H15a3,3,0,0,0,3-3V5a3,3,0,0,0-3-3Z" style={ { fill:'#444' } } />
			<Polygon points="11.1 6.97 10.32 13.88 12.21 13.22 14.02 18.41 15.91 17.76 14.1 12.57 15.99 11.91 11.1 6.97" style={ { fill:'#fff', stroke:'#444', strokeMiterlimit:10 } } />
		</SVG>
	),

	category: 'embed',

	description: __( 'Display UI parts to invoke user\'s action.', 'kbl' ),

	attributes: {
		order: {
			type: 'string',
			default: '',
		},
		number: {
			type: 'integer',
			default: 1,
		},
		positions: {
			type: 'array',
			default: [],
		},
		predefinedPositions: {
			type: 'array',
			default: [],
		},
	},

	edit( { attributes, setAttributes, className } ) {
		const { positions, predefineds, orders } = KblCta;
		return <>
			<InspectorControls>
				<PanelBody title={ __( 'CTA Setting', 'kbl' ) } initialOpen={ true }>
					<p>{ __( 'Positions', 'kbl' ) }</p>
					<CheckboxGroup checked={ attributes.positions } options={ positions } onChange={ ( newPositions ) => setAttributes( { positions: newPositions } ) } />
					<hr />
					<p>{ __( 'Predefined Positions', 'kbl' ) }</p>
					<CheckboxGroup checked={ attributes.predefinedPositions } options={ predefineds } onChange={ ( newPositions ) => setAttributes( { predefinedPositions: newPositions } ) } />
					<hr />
					<SelectControl value={ attributes.order } label={ __( 'Order', 'kbl' ) }
						options={ orders } onChange={ ( order ) => setAttributes( { order } ) } />
					<hr/>
					<TextControl label={ __( 'Number to display', 'kbl' ) } value={ attributes.number }
								 type="number" min={ 1 }
								 onChange={ (  number ) => setAttributes( { number: parseInt( number, 10 ) } ) } />
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
				<ServerSideRender
					block="kunoichi/cta"
					attributes={ attributes } />
			</div>
		</>
	},

	save() {
		return null;
	}

} );
