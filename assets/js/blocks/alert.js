/*!
 * Alert blocks.
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, wp-api-fetch
 */

/* global KblAlert:false */

const { registerBlockType, registerBlockStyle } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { RichText, InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;


registerBlockType( 'kunoichi/alert', {

	title: __( 'Alert', 'kbl' ),

	icon: 'warning',

	category: 'formatting',

	description: __( 'Styled alert blocks.', 'kbl' ),

	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.kbl-alert-title'
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.kbl-alert-body p'
		},
		alignment: {
			type: 'string',
			default: '',
		},
		closable: {
			type: 'boolean',
			default: false,
		}
	},

	edit(  { attributes, setAttributes, className } ) {
		const classes = [ 'kbl-alert', 'alert' ];
		if ( attributes.alignment ) {
			classes.push( sprintf( 'has-text-align-%s', attributes.alignment ) );
		}
		if ( className ) {
			classes.unshift( className )
		}
		const options = [
			{ value: null, label: __( 'Not specify', 'kbl' ), disabled: true },
			{ value: 'left', label: __( 'Left', 'kbl' ) },
			{ value: 'center', label: __( 'Center', 'kbl' ) },
			{ value: 'right', label: __( 'Right', 'kbl' ) },
		];
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Speaker', 'kbl' ) } initialOpen={ true }>
						<TextControl label={ __( 'Title', 'kbl' ) } value={ attributes.title }
							help={ __( 'If empty, omitted.', 'kbl' ) }
							onChange={ ( title ) => setAttributes( { title } ) } />
						<SelectControl label={ __( 'Text Alignment', 'kbl' ) } value={ attributes.alignment }
							options={ options }
							onChange={ ( alignment ) => setAttributes( { alignment } ) } />
						<ToggleControl label={ __( 'Closable', 'kbl' ) }
							help={ attributes.closable ? __( 'This alert can be closed.', 'kbl' ) : __( 'This alert stays opened.', 'kbl' ) }
							checked={ attributes.closable }
							onChange={ ( closable ) => setAttributes( { closable } ) } />
					</PanelBody>
				</InspectorControls>
				<div className={ classes.join( ' ' ) }>
					{ attributes.title && (
						<div className="kbl-alert-title alert-heading h4">
							{ attributes.title }
						</div>
					) }
					{ attributes.closable && (
						<button type="button" className="close">
							<span aria-hidden="true">&times;</span>
						</button>
					) }
					<div className="kbl-alert-body">
						<RichText
							tagName={ 'p' } value={ attributes.content }
							onChange={ content => setAttributes( { content } ) } />
					</div>
				</div>
			</>
		);
	},

	save( { attributes } ) {
		const classNames = [ 'kbl-alert', 'alert' ];
		if ( attributes.alignment ) {
			if ( attributes.alignment ) {
				classNames.push( sprintf( 'has-text-align-%s', attributes.alignment ) );
			}
		}
		if ( attributes.closable ) {
			classNames.push( 'alert-dismissible fade show' );
		}
		return (
			<div className={ classNames.join( ' ' ) } role="alert">
				{ attributes.closable && (
					<button type="button" className="close" data-dismiss="alert" aria-label={ __( 'Close', 'kbl' ) }>
						<span aria-hidden="true">&times;</span>
					</button>
				) }
				{ attributes.title && (
					<div className="kbl-alert-title alert-heading h4">
						{ attributes.title }
					</div>
				) }
				<div className='kbl-alert-body'>
					<RichText.Content tagName="p" value={ attributes.content } />
				</div>
			</div>
		)
	}
} );

let isDefault = true;
if ( KblAlert && KblAlert.styles ) {
	for ( const prop in KblAlert.styles ) {
		if ( ! KblAlert.styles.hasOwnProperty( prop ) ) {
			continue;
		}
		registerBlockStyle( 'kunoichi/alert', {
			name: prop,
			label: KblAlert.styles[ prop ],
			isDefault: isDefault,
		} );
		isDefault = false;
	}
}
