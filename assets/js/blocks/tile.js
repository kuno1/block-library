/*!
 * Tile item.
 *
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components
 */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { InnerBlocks, InspectorControls, withColors, PanelColorSettings } = wp.blockEditor;

const tileClass = ( className, attributes ) => {
	const c = [ 'kbl-tiled-grid-item' ];
	if ( className ) {
		c.push( className );
	}
	if ( attributes.color ) {
		c.push( sprintf( 'has-%s-text-color', attributes.color ) );
	}
	if ( attributes.backgroundColor ) {
		c.push( sprintf( 'has-%s-background-color', attributes.backgroundColor ) );
	}
	return c.join( ' ' );
};

registerBlockType( 'kunoichi/tile', {

	title: __( 'Tile', 'kbl' ),

	icon: 'screenoptions',

	category: 'layout',

	description: __( 'Tile item in tiled grid.', 'kbl' ),

	parent: [ 'kunoichi/tiled-grid' ],

	attributes: {
		color: {
			type: 'string',
			default: '',
		},
		backgroundColor: {
			type: 'string',
			default: '',
		},
	},

	edit: withColors( 'backgroundColor', 'color' )( ( { attributes, className, backgroundColor, setBackgroundColor, color, setColor } ) => {
		const colorSettings = [
			{
				value: color.color,
				label: __( 'Text Color', 'kbl' ),
				onChange: setColor,
				disableCustomColors: true,
			},
			{
				value: backgroundColor.color,
				label: __( 'Background Color', 'kbl' ),
				onChange: setBackgroundColor,
				disableCustomColors: true,
			},
		];

		return (
			<>
				<InspectorControls>
					<PanelColorSettings initialOpen={ true } title={ __( 'Tile Colors', 'kbl', ) }
						colorSettings={ colorSettings } />
				</InspectorControls>
				<div className={ tileClass( className, attributes ) }>
					<div className="kbl-tiled-grid-inner">
						<InnerBlocks />
					</div>
				</div>
			</>
		);
	} ),

	save( { attributes } ) {
		return (
			<div className={ tileClass( null, attributes ) }>
				<div className="kbl-tiled-grid-inner">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
