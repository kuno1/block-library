/*!
 * wpdeps=wp-blocks, kbl, wp-block-editor, kbl, wp-components, wp-hooks
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { applyFilters } = wp.hooks;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { G, Path, SVG, PanelBody, TextControl, ToggleControl } = wp.components;

const getClassName = ( className, attributes ) => {
	className = className ? className += ' kbl-price-item' : 'kbl-price-item';
	if ( attributes.featured ) {
		className += ' kbl-price-item-featured';
	}
	return className;
};

const getPriceTemplate = () => {
	return applyFilters( 'kbl_price_template', [
		[
			'core/list', {
				ordered: false,
			},
		],
		[
			'core/button', {
				align: 'center',
			},
		]
	] );
};

const getPriceBlock = () => {
	return applyFilters( 'kbl_allowed_blocks_in_price', [ 'core/heading', 'core/list', 'core/button', 'core/paragraph' ] );
};

registerBlockType( 'kunoichi/price', {

	title: __( 'Price Item', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="price">
				<Path d="M5.26,16h-1V14.22a4.52,4.52,0,0,1-2.5-.77l.39-1a4.15,4.15,0,0,0,2.31.75,1.89,1.89,0,0,0,2.07-1.9c0-1.05-.64-1.71-2-2.3C3,8.33,2,7.55,2,6.06A2.78,2.78,0,0,1,4.42,3.28V1.51h1V3.24a4.14,4.14,0,0,1,2.12.61l-.39.94a4.12,4.12,0,0,0-2-.59A1.74,1.74,0,0,0,3.19,5.89c0,1,.69,1.49,2.07,2.13,1.68.77,2.6,1.61,2.6,3.18a2.93,2.93,0,0,1-2.6,3Z" />
				<line x1="13.5" y1="2.5" x2="8" y2="18" style={ { fill:'none', stroke:'#000', strokeMiterlimit:10, strokeWidth: '0.75px' } } />
				<Path d="M14.09,13.45h1.2v4h-.78V14.73c0-.08,0-.19,0-.32v-.33l-.75,3.33H13l-.74-3.33v3.33h-.77v-4h1.21l.72,3.11Z" />
				<Path d="M18.44,17.05a1.37,1.37,0,0,1-1.13.46,1.37,1.37,0,0,1-1.13-.46,1.72,1.72,0,0,1-.37-1.1,1.76,1.76,0,0,1,.37-1.1,1.37,1.37,0,0,1,1.13-.47,1.37,1.37,0,0,1,1.13.47,1.7,1.7,0,0,1,.37,1.1A1.66,1.66,0,0,1,18.44,17.05Zm-.62-.42a1.37,1.37,0,0,0,0-1.36.6.6,0,0,0-.51-.24.61.61,0,0,0-.52.24,1.37,1.37,0,0,0,0,1.36.61.61,0,0,0,.52.24A.6.6,0,0,0,17.82,16.63Z" />
			</G>
		</SVG>
	),

	category: 'common',

	description: __( 'Price item in price tables.', 'kbl' ),

	parent: [ 'kunoichi/price-table' ],

	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.kbl-price-plan',
			default: '',
		},
		price: {
			type: 'string',
			source: 'html',
			selector: '.kbl-price-number',
			default: '',
		},
		help: {
			type: 'string',
			default: '',
		},
		featured: {
			type: 'boolean',
			default: false,
		},
	},

	edit( { attributes, setAttributes, className } ) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Price Detail', 'kbl' ) } defaultOpen={ true }>
						<TextControl label={ __( 'Help', 'kbl' ) } value={ attributes.help }
							placeholder={ __( 'per 1 month', 'kbl' ) }
							help={ __( 'Help text displayed just after the price. For example, if this price is subscription plan, "per 1 month" is helpful', 'kbl' ) }
							onChange={ ( help ) => setAttributes( { help } ) } />
						<hr />
						<ToggleControl label={ __( 'Featured', 'kbl' ) } checked={ attributes.featured }
							help={ __( 'If this price is featured, check', 'kbl' ) }
							onChange={ ( featured ) => setAttributes( { featured } ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ getClassName( className, attributes ) }>
					<RichText tagName="h3" className="kbl-price-plan" value={ attributes.title }
						placeholder={ __( 'e.g. Standard', 'kbl' ) }
						onChange={ ( title ) => setAttributes( { title } ) } />
					<div className="kbl-price-detail">
						<RichText tagName="p" className="kbl-price-number" value={ attributes.price }
							placeholder={ __( 'Free', 'kbl' ) }
							onChange={ ( price ) => setAttributes( { price } ) } />
						{ attributes.help && (
							<p className="kbl-price-help">{ attributes.help }</p>
						) }
					</div>
					<InnerBlocks allowedBlocks={ getPriceBlock() } template={ getPriceTemplate() } />
				</div>
			</>
		);
	},

	save( { attributes } ) {
		return (
			<li className={ getClassName( null, attributes ) }>
				<RichText.Content tagName="h3" className="kbl-price-plan" value={ attributes.title } />
				<div className="kbl-price-detail">
					<RichText.Content tagName="p" className="kbl-price-number" value={ attributes.price } />
					{ attributes.help && (
						<p className="kbl-price-help">{ attributes.help }</p>
					) }
				</div>
				<InnerBlocks.Content />
			</li>
		);
	}
} );
