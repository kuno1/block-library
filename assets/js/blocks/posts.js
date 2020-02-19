/*!
 * Post list block.
 *
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, kbl-components-taxonomy-selector
 */

/* global KblPostList:false */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InspectorControls } = wp.blockEditor;
const { ServerSideRender, PanelBody, SelectControl, TextControl, RadioControl, ToggleControl } = wp.components;
const { TaxonomySelector } = kbl;

const assocToArray = ( object ) => {
	const returnArray = [];
	for ( const key in object ) {
		if ( object.hasOwnProperty( key ) ) {
			returnArray.push( {
				label: object[ key ],
				value: key,
			} );
		}
	}
	return returnArray;
};

const orderOptions = assocToArray( KblPostList.orderby );
const postTypeOptions = assocToArray( KblPostList.post_types );
const templateOptions = assocToArray( KblPostList.templates );

registerBlockType( 'kunoichi/posts', {

	title: __( 'Post List', 'kbl' ),

	icon: 'list-view',

	category: 'formatting',

	description: __( 'Display post list in various format.', 'kbl' ),

	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		ids: {
			type: 'string',
			default: '',
		},
		template: {
			type: 'string',
			default: '',
		},
		s: {
			type: 'string',
			default: '',
		},
		term_ids: {
			type: 'array',
			default: [],
		},
		post_type: {
			type: 'string',
			default: 'post',
		},
		number: {
			type: 'integer',
			default: 5,
		},
		orderby: {
			type: 'string',
			default: 'date',
		},
		order: {
			type: 'string',
			default: 'DESC',
		},
		showMore: {
			type: 'boolean',
			default: true,
		},
		moreLabel: {
			type: 'string',
			default: '',
		},
		ignore_sticky: {
			type: 'boolean',
			default: true,
		},
	},

	edit( { attributes, setAttributes, className } ) {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Template Setting', 'kbl' ) }>
						<RadioControl selected={ attributes.template } onChange={ ( template ) => setAttributes( { template } ) }
							options={ templateOptions } />
					</PanelBody>
					<PanelBody title={ __( 'Query Setting', 'kbl' ) }>
						<SelectControl value={ attributes.post_type }
							label={ __( 'Post Type', 'kbl' ) }
							options={ postTypeOptions }
							onChange={ ( post_type ) => setAttributes( { post_type } ) } />
						<hr />
						<TextControl label={ __( 'Search String', 'kbl' ) } value={ attributes.s }
							onChange={ ( s ) => setAttributes( { s } ) }
							placeholder={ __( 'Keywords', 'kbl' ) } />
						<hr />
						<TaxonomySelector selected={ attributes.term_ids } onChange={ ( ids ) => setAttributes( { term_ids: ids } ) } />
						<hr />
						<TextControl type="number" label={ __( 'Number of Posts', 'kbl' ) } value={ attributes.number }
							onChange={ ( number ) => setAttributes( { number } ) }
							help={ __( 'Max posts number to display.', 'kbl' ) }/>
						<hr />
						<TextControl label={ __( 'Post IDs', 'kbl' ) } value={ attributes.ids }
							onChange={ ( ids ) => setAttributes( { ids } ) }
							help={ __( 'Write in CSV format. If set, all other settings will be ignored.', 'kbl' ) }
							placeholder="e.g. 1, 3, 5" />
						<ToggleControl label={ __( 'Ignore Sticky Posts', 'kbl' ) }
							onChange={ ( ignore_sticky ) => setAttributes( { ignore_sticky } ) }
							checked={ attributes.ignore_sticky } />
					</PanelBody>
					<PanelBody title={ __( 'Order', 'kbl' ) } initialOpen={ false }>
						<SelectControl label={ __( 'Order By', 'kbl' ) } selected={ attributes.post_type }
							options={ orderOptions }
							help={ __( 'If you select random, Order will be ignored.', 'kbl' ) }
							onChange={ ( orderby ) => setAttributes( { orderby } ) } />
						{ 'rand' !== attributes.order && (
							<RadioControl label={ __( 'Order', 'kbl' ) } selected={ attributes.order }
								options={ [
									{ label: __( 'Descending', 'kbl' ), value: 'DESC' },
									{ label: __( 'Ascending', 'kbl' ), value: 'ASC' },
								] }
								onChange={ ( order ) => { setAttributes( { order } ) } } />
						) }
					</PanelBody>
					<PanelBody title={ __( 'More', 'kbl' ) } initialOpen={ false }>
						<ToggleControl label={ __( 'Display more link', 'kbl' ) } checked={ attributes.showMore }
							onChange={ ( showMore ) => setAttributes( { showMore } ) }
							help={ __( 'Display more link if possible. It depends on theme compatibility.', 'kbl' ) } />
						<TextControl label={ __( 'More Label', 'kbl' ) } value={ attributes.moreLabel }
							onChange={ ( moreLabel ) => setAttributes( { moreLabel } ) }
							placeholder={ __( 'More', 'kbl' ) } />
					</PanelBody>
				</InspectorControls>
				<div className="kbl-post-list-admin">
					<ServerSideRender
						block="kunoichi/posts"
						attributes={ attributes } />
				</div>
			</>
		);
	},

	save() {
		return null;
	},
} );
