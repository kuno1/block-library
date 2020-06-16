/*!
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components, kbl-price, wp-data, kbl-components-add-child
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { G, Path, SVG, Rect, PanelBody, Button } = wp.components;
const { addChild, ChildInsert } = kbl;

registerBlockType( 'kunoichi/price-table', {

	title: __( 'Price Table', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="price-table">
				<Rect width="6" height="20" style={ { fill:'#b5b5b6' } } />
				<Rect x="7" width="6" height="20" style={ { fill:'#b5b5b6' } } />
				<Rect x="14" width="6" height="20" style={ { fill:'#b5b5b6' } } />
				<Path d="M3.15,6.8H2.84V6.21A1.42,1.42,0,0,1,2,6l.12-.32a1.33,1.33,0,0,0,.76.25.62.62,0,0,0,.68-.62c0-.35-.21-.56-.65-.76s-.87-.49-.87-1a.92.92,0,0,1,.81-.91V2h.31v.57a1.32,1.32,0,0,1,.7.2l-.13.31a1.33,1.33,0,0,0-.67-.2.58.58,0,0,0-.61.56c0,.33.23.49.68.7s.85.53.85,1a1,1,0,0,1-.85,1Z" />
				<Path d="M10.15,6.8H9.84V6.21A1.42,1.42,0,0,1,9,6l.12-.32a1.33,1.33,0,0,0,.76.25.62.62,0,0,0,.68-.62c0-.35-.21-.56-.65-.76s-.87-.49-.87-1a.92.92,0,0,1,.81-.91V2h.31v.57a1.32,1.32,0,0,1,.7.2l-.13.31a1.33,1.33,0,0,0-.67-.2.58.58,0,0,0-.61.56c0,.33.23.49.68.7s.85.53.85,1a1,1,0,0,1-.85,1Z" />
				<Path d="M17.15,6.8h-.31V6.21A1.42,1.42,0,0,1,16,6l.12-.32a1.33,1.33,0,0,0,.76.25.62.62,0,0,0,.68-.62c0-.35-.21-.56-.65-.76s-.87-.49-.87-1a.92.92,0,0,1,.81-.91V2h.31v.57a1.32,1.32,0,0,1,.7.2l-.13.31a1.33,1.33,0,0,0-.67-.2.58.58,0,0,0-.61.56c0,.33.23.49.68.7s.85.53.85,1a1,1,0,0,1-.85,1Z" />
				<Rect x="1" y="16" width="4" height="2" rx="1" />
				<Rect x="8" y="16" width="4" height="2" rx="1" />
				<Rect x="15" y="16" width="4" height="2" rx="1" />
				<line x1="1" y1="9" x2="5" y2="9" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="1" y1="11" x2="5" y2="11" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="1" y1="13" x2="5" y2="13" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="8" y1="9" x2="12" y2="9" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="8" y1="11" x2="12" y2="11" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="8" y1="13" x2="12" y2="13" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="15" y1="9" x2="19" y2="9" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="15" y1="11" x2="19" y2="11" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
				<line x1="15" y1="13" x2="19" y2="13" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10 } } />
			</G>
		</SVG>
	),

	category: 'formatting',

	description: __( 'Display price table. Insert 3 or 4 items.', 'kbl' ),

	attributes: {

	},

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { className, clientId } ) {
		className += ' kbl-price-table';
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Price Table Setting', 'kbl' ) } defaultOpen={ true }>
						<Button isPrimary={ true } onClick={ () => addChild( 'kunoichi/price', clientId ) }>{ __( 'Add New Column', 'kbl' ) }</Button>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<InnerBlocks allowedBlocks={ [ 'kunoichi/price' ] } renderAppender={ false } template={ [
						[ 'kunoichi/price' ],
						[ 'kunoichi/price' ],
						[ 'kunoichi/price' ],
					] } />
					<ChildInsert block="kunoichi/price" clientId={ clientId } />
				</div>
			</>
		);
	},

	save() {
		return (
			<ul className="kbl-price-table">
				<InnerBlocks.Content />
			</ul>
		);
	}
} );
