/*!
 * wpdeps=wp-blocks, kbl, wp-editor, wp-components, kbl-card, wp-data, kbl-components-add-child
 */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.editor;
const { Button, PanelBody, RangeControl } = wp.components;
const { ChildInsert } = kbl;

const setClassName = ( className, attributes ) => {
	let classes = 'kbl-link-card-list';
	if ( className ) {
		classes += ' ' + className;
	}
	classes += sprintf( ' has-%d-columns', attributes.columns );
	return classes;
};

registerBlockType( 'kunoichi/cards', {

	title: __( 'Cards', 'kbl' ),

	icon: 'images-alt2',

	description: __( 'Display card style links. Helpful as category link list and so on.', 'kbl' ),

	category: 'formatting',

	attributes: {
		columns: {
			type: 'integer',
			default: 3,
		},
	},

	edit( { attributes, setAttributes, className, clientId } ) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Layout Setting', 'kbl' ) }>
						<RangeControl label={ __( 'Column Count', 'kbl' ) } value={ attributes.columns }
							min={ 2 } max={ 4 }
							onChange={ ( columns ) => setAttributes( { columns } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ setClassName( className, attributes ) }>
					<InnerBlocks allowedBlocks={ [ 'kunoichi/card' ] } renderAppender={ false } template={ [
						[ 'kunoichi/card' ],
					] } />
				</div>
				<ChildInsert block="kunoichi/card" clientId={ clientId } />
			</>
		);
	},

	save( { attributes } ) {
		return (
			<ul className={ setClassName( '', attributes ) }>
				<InnerBlocks.Content />
			</ul>
		);
	},
} );
