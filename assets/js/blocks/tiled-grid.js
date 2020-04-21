/*!
 * Tiled Grid
 *
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components, wp-data, kbl-components-add-child, kbl-tile
 */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { G, Path, SVG, Rect, PanelBody, Button, IconButton, RangeControl } = wp.components;
const { addChild, ChildInsert } = kbl;

/**
 * Get class name.
 *
 * @param {String} classes
 * @param {Object} attributes
 * @returns {string}
 */
const classNames = ( classes, attributes ) => {
	const c = [ 'kbl-tiled-grid' ];
	if ( classes ) {
		c.push( classes );
	}
	c.push( sprintf( 'has-%d-columns', attributes.columns ) );
	c.push( sprintf( 'has-%d-mobile-columns', attributes.mobile ) );
	return c.join( ' ' );
};


registerBlockType( 'kunoichi/tiled-grid', {

	title: __( 'Tiled Grid', 'kbl' ),

	icon: 'screenoptions',

	category: 'layout',

	description: __( 'Grid style layout of panel items. Ready for text & background colors.', 'kbl' ),

	attributes: {

		columns: {
			type: 'number',
			default: 2,
		},

		mobile: {
			type: 'number',
			default: 1,
		},

	},

	supports: {
		align: [ 'wide', 'full' ],
	},


	edit( { attributes, setAttributes, className, clientId } ) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Tiled Grid Setting', 'kbl' ) } defaultOpen={ true }>
						<Button isPrimary={ true } onClick={ () => addChild( 'kunoichi/tile', clientId ) }>{ __( 'Add New Tile', 'kbl' ) }</Button>
						<hr />
						<RangeControl label={ __( 'Column Count', 'kbl' ) } value={ attributes.columns } min={ 1 } max={ 4 }
							onChange={ ( columns ) => setAttributes( { columns } ) } />
						<RangeControl label={ __( 'Mobile Max Columns', 'kbl' ) } value={ attributes.mobile } min={ 1 } max={ 2 }
									  onChange={ ( mobile ) => setAttributes( { mobile } ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ classNames( className, attributes ) }>
					<InnerBlocks allowedBlocks={ [ 'kunoichi/tile' ] } renderAppender={ false } template={ [
						[ 'kunoichi/tile' ],
						[ 'kunoichi/tile' ],
					] } />
					<ChildInsert block="kunoichi/tile" clientId={ clientId } />
				</div>
			</>
		);
	},

	save( { attributes } ) {
		return (
			<div className={ classNames( false, attributes ) }>
				<InnerBlocks.Content />
			</div>
		);
	}

} );
