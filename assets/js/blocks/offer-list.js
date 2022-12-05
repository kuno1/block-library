/*!
 * Offer list
 *
 * wpdeps=wp-blocks, kbl, wp-block-editor, kbl-offer
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

const setClassName = ( attributes, className = '' ) => {
	const classNames = [ 'kbl-offer-list' ];
	if ( className ) {
		classNames.push( className );
	}
	return classNames.join( ' ' );
};

registerBlockType( 'kunoichi/offer-list', {

	title: __( 'Offer List', 'kbl' ),

	icon: 'cart',

	description: __( 'Display offer list of products with price, links, and spec.', 'kbl' ),

	category: 'formatting',

	edit( { className } ) {
		return (
			<>
				<div className={ setClassName( className ) }>
					<InnerBlocks allowedBlocks={ [ 'kunoichi/offer' ] } templateLock={ false } template={ [ [ 'kunoichi/offer' ] ] } />
				</div>
			</>
		);
	},

	save() {
		return (
			<ul className={ setClassName( {} ) }>
				<InnerBlocks.Content />
			</ul>
		);
	}
} );
