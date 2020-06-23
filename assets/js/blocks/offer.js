/*!
 * Offer product.
 *
 * wpdeps=wp-blocks, wp-block-editor, kbl, wp-components, kbl-definition-list
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;

const setClassName = ( attributes, className = '', defaultClassName = 'kbl-offer' ) => {
	const classNames = [ defaultClassName ];
	if ( className ) {
		classNames.push( className );
	}
	if ( attributes.featured ) {
		classNames.push( 'kbl-offer-featured' );
	}
	return classNames.join( ' ' );
};


registerBlockType( 'kunoichi/offer-content', {

	title: __( 'Offer Content', 'kbl' ),

	icon: 'cart',

	category: 'common',

	description: __( 'Title, price, and specs of an offer.', 'kbl' ),

	parent: [ 'kunoichi/offer' ],

	edit( { attributes, className } ) {
		return (
			<div className={ setClassName( attributes, className, 'kbl-offer-body') }>
				<InnerBlocks templateLock="all" template={ [
					[ 'core/heading', {
						className: 'kbl-offer-title',
						placeholder: __( 'Product Title', 'kbl' ),
					} ],
					[ 'core/paragraph', {
						placeholder: __( 'e.g. $19.99', 'kbl' ),
						className: 'kbl-offer-price',
					} ],
					[ 'kunoichi/definition-list', {
						className: 'kbl-offer-spec',
					}, [
						[ 'kunoichi/dt', {} ],
						[ 'kunoichi/dd', {} ],
					] ]
				] } />
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className={ setClassName( attributes, '', 'kbl-offer-body' ) }>
				<InnerBlocks.Content />
			</div>
		);
	}
} );

//
registerBlockType( 'kunoichi/offer-action', {

	title: __( 'Offer Action', 'kbl' ),

	icon: 'cart',

	category: 'common',

	description: __( 'Aciton link for offer block.', 'kbl' ),

	parent: [ 'kunoichi/offer' ],

	edit( { attributes, className } ) {
		return (
			<footer className={ setClassName( attributes, className, 'kbl-offer-action') }>
				<InnerBlocks templateLock="all" template={ [
					[ 'core/button', {
						className: 'kbl-offer-actions',
						placeholder: __( 'Product Title', 'kbl' ),
						align: 'center',
					} ]
				] } />
			</footer>
		);
	},

	save( { attributes } ) {
		return (
			<footer className={ setClassName( attributes, '', 'kbl-offer-action' ) }>
				<InnerBlocks.Content />
			</footer>
		);
	}
} );

registerBlockType( 'kunoichi/offer', {

	title: __( 'Offer', 'kbl' ),

	icon: 'cart',

	category: 'common',

	description: __( 'Product offer with price, link, and spec. Helpful for promoting external products.', 'kbl' ),

	parent: [ 'kunoichi/offer-list' ],

	supports: {
		align: [ 'right', 'left' ],
	},

	attributes: {
		featured: {
			type: 'boolean',
			default: false,
		},
		align: {
			type: 'string',
			default: 'left',
		},
	},

	edit( { attributes, className, setAttributes } ) {
		return (
			<>
				<InspectorControls>
					<PanelBody initialOpen={ true } title={ __( 'Offer Option', 'kbl' ) }>
						<ToggleControl label={ __( 'Featured', 'kbl' ) } onChange={ ( featured ) => setAttributes( { featured } ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ setClassName( attributes, className ) }>
					<InnerBlocks template={ [
						[ 'core/image', {
							className: 'kbl-offer-image',
						} ],
						[ 'kunoichi/offer-content' ],
						[ 'kunoichi/offer-action' ],
					] } templateLock="all" />
					{ !!attributes.image && (
						<img src={ attributes.image } alt={ attributes.title } className="kbl-offer-image" />
					) }
				</div>
			</>
		);
	},

	save( { attributes } ) {
		return (
			<div className={ setClassName( attributes ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
