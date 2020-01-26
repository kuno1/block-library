/*!
 * wpdeps=wp-blocks,kbl,wp-editor, wp-components, wp-api-fetch
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InspectorControls } = wp.editor;
const { Button, PanelBody, SelectControl, TextControl, ServerSideRender } = wp.components;

registerBlockType( 'kunoichi/testimonials', {

	title: __( 'Testimonials', 'kbl' ),

	icon: 'awards',

	category: 'embed',

	description: __( 'Display testimonials list.', 'kbl' ),

	attributes: {
		ids: {
			type: 'string',
			default: '',
		},
		order: {
			type: 'string',
			default: 'latest',
		},
		number: {
			type: 'integer',
			default: 5,
		},
	},

	edit( { attributes, setAttributes, className } ) {
		const options = [
			{
				label: __( 'Latest', 'kbl' ),
				value: 'latest',
			},
			{
				label: __( 'Menu Order', 'kbl' ),
				value: 'menu_order',
			},
			{
				label: __( 'Random', 'kbl' ),
				value: 'random',
			},
		];
		className += ' kbl-testimonials';
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Testimonials Setting', 'kbl' ) } initialOpen={ true }>
						<TextControl label={ __( 'Post IDs', 'kbl' ) } value={ attributes.ids }
							onChange={ ( ids ) => setAttributes( { ids } ) }
							help={ __( 'Write in CSV format. If set, order and number will be ignored.', 'kbl' ) }
							placeholder="e.g. 1, 3, 5" />
						<TextControl label={ __( 'Number to display', 'kbl' ) } value={ attributes.number }
									 type="number" min={ 1 }
									 onChange={ (  number ) => setAttributes( { number: parseInt( number, 10 ) } ) } />
						<SelectControl value={ attributes.order } label={ __( 'Order', 'kbl' ) }
									   options={ options } onChange={ ( order ) => setAttributes( { order } ) } />\

					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<ServerSideRender
						block="kunoichi/testimonials"
						attributes={ attributes } />
				</div>
			</>
		);
	},

	save() {
		return null;
	},
} );
