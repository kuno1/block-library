/*!
 * Post list block.
 *
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, wp-compose, wp-api-fetch, wp-data
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, TextControl, Spinner } = wp.components;
const { useState, useEffect } = wp.element;
const { apiFetch } = wp;
const { dispatch, select } = wp.data;

const Edit = ( { attributes, setAttributes } ) => {
	// States.
	const [ { loading, html }, setState ] = useState( {
		loading: true,
		html: '',
	} );
	// Run initialization.
	useEffect( () => {
		fetch();
	}, [ attributes.title, attributes.max_depth, attributes.className, attributes.prefix ] );

	// Set option variables.
	const options = [];
	for ( let i = 2; i <= 6; i++ ) {
		options.push( {
			label: 'H' + i,
			value: i,
		} );
	}
	// Fetch function.
	const fetch = () => {
		const post = select( 'core/editor' ).getCurrentPost();
		return apiFetch( {
			method: 'post',
			path: '/kbl/v1/toc',
			data: {
				...attributes,
				body: post.content,
			},
		} ).then( ( res ) => {
			setState( {
				loading: false,
				html: res.toc,
			} );
		} ).catch( ( error ) => {
			dispatch( 'core/notices' ).createNotice( 'error', error.message, {
				isDismissible: true,
			} );
			setState( {
				loading: false,
				html: '',
			} );
		} );
	};
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Toc Setting', 'kbl' ) }>
					<TextControl label={ __( 'Title', 'kbl' ) } value={ attributes.title}
						onChange={ ( title ) => setAttributes( { title } ) }
						help={ __( 'Default is empty.', 'kbl' ) } />
					<hr />
					<SelectControl label={ __( 'Heading Level', 'kbl' ) } value={ attributes.max_depth }
						onChange={ ( maxDepth ) => setAttributes( { max_depth: parseInt( maxDepth ) } ) }
						options={ options }	 />
					<hr />
					<TextControl label={ __( 'Prefix for ID', 'kbl' ) } value={ attributes.prefix}
						onChange={ ( prefix ) => setAttributes( { prefix } ) }
						help={ __( 'Prefix for headings ID attributes.', 'kbl' ) } />
				</PanelBody>
			</InspectorControls>
			{ loading && (
				<div className="components-placeholder" style={ { position: 'relative', backgroundColor: '#f3f3f3' } }>
					<Spinner style={ {
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					} } />
				</div>
			)}
			{ ( ! loading && 0 < html.length ) && (
				<div className="kbl-toc-admin" dangerouslySetInnerHTML={ { __html: html } }></div>
			) }
			{ ( ! loading && 1 > html.length ) && (
				<div className="components-placeholder" style={ {
					backgroundColor: '#f3f3f3'
				} }>
					<div className="components-placeholder__label" style={ {
						justifyContent: 'center',
						width: '100%',
					} }>
						<span className="dashicons dashicons-warning"></span>
						{ attributes.title || __( 'Table of Contents', 'kbl' ) }
					</div>
					<div className="components-placeholder__fieldset" style={ { justifyContent: 'center' } }>
						<p>{ __( 'No headings found.', 'kbl' ) }</p>
					</div>
				</div>
			) }
		</>
	);
};

registerBlockType( 'kunoichi/toc', {

	title: __( 'Toc', 'kbl' ),

	icon: 'list-view',

	category: 'formatting',

	description: __( 'Display TOC extracted from Heading tags in post content.', 'kbl' ),

	attributes: {
		title: {
			type: 'string',
			default: '',
		},
		max_depth: {
			type: 'integer',
			default: 3,
		},
		prefix: {
			type: 'string',
			default: 'content-section',
		},
		className: {
			type: 'string',
			default: '',
		},
	},

	edit: Edit,

	save() {
		return null;
	},
} );
