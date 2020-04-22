/*!
 * Enhanced section blocks.
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components
 */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { PanelBody, ToggleControl, TextControl, Button, RangeControl } = wp.components;
const { InnerBlocks, withColors, InspectorControls, PanelColorSettings, MediaUpload } = wp.blockEditor;

/* global KblSection: false */

/**
 * Get blur attributes.
 *
 * @param attributes
 * @returns {{filter: string, top: string, left: string, bottom: string, right: string}}
 */
const getBlurStyle = ( attributes ) => {
	let blurPadding = attributes.blur * -1 + 'px';
	return {
		left: blurPadding,
		right: blurPadding,
		top: blurPadding,
		bottom: blurPadding,
		filter: `blur( ${attributes.blur}px )`
	}
};

const classNameFromAttributes = ( className, attributes ) => {
	className = className ? [ className, 'kbl-section' ] : [ 'kbl-section' ];
	if ( attributes.blur ) {
		className.push( 'has-blur' );
	}
	return className.join( ' ' );
};

const setBgClass = ( attributes ) => {
	const classNames = [ 'kbl-section-bg' ];
	if ( attributes.backgroundColor ) {
		classNames.push( 'has-background-color' );
		classNames.push( `has-${attributes.backgroundColor}-background-color`);
	}
	return classNames.join( ' ' );
};

const sectionStyle = ( attributes ) => {
	const styles = {};
	if ( attributes.paddingVertical || attributes.paddingHorizontal ) {
		styles.padding = sprintf( '%dpx %dpx', attributes.paddingVertical, attributes.paddingHorizontal );
	}
	if ( attributes.backgroundImage ) {
		styles.backgroundImage = sprintf( 'url(\'%s\')', attributes.backgroundImage );
	}
	return styles;
};

registerBlockType( 'kunoichi/section', {

	title: __( 'Section', 'ku-mag' ),

	icon: 'grid-view',

	category: 'layout',

	description: __( 'Enhanced group block which supports background.', 'kbl' ),

	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		hasContainer: {
			type: 'boolean',
			default: true,
		},
		paddingVertical: {
			type: 'integer',
			default: 40,
		},
		paddingHorizontal: {
			type: 'integer',
			default: 0,
		},
		backgroundColor: {
			type: 'string',
		},
		opacity: {
			type: 'integer',
			default: 0,
		},
		backgroundImage: {
			type: 'string',
			default: '',
		},
		blur: {
			type: 'integer',
			default: 0,
		},
		more: {
			type: 'boolean',
			default: false,
		},
		height: {
			type: 'number',
			default: 200,
		},
		label: {
			type: 'string',
			default: '',
		},
	},

	edit: withColors( 'backgroundColor' )( ( { attributes, setAttributes, className, backgroundColor, setBackgroundColor } ) => {
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Layout', 'kbl' ) } initialOpen={ false }>
						<ToggleControl label={ __( 'Container inside', 'kbl' ) } checked={ attributes.hasContainer }
							onChange={ ( hasContainer ) => setAttributes( { hasContainer } ) }
							help={ __( 'If checked, container will be inside.', 'kbl' ) }/>
						<TextControl label={ __( 'Vertical Padding', 'kbl' ) } value={ attributes.paddingVertical } type='number' onChange={ value => setAttributes( { paddingVertical: parseInt( value, 10 ) } ) } />
						<TextControl label={ __( 'Horizontal Padding', 'kbl' ) } value={ attributes.paddingHorizontal } type='number' onChange={ value => setAttributes( { paddingHorizontal: parseInt( value, 10 ) } ) } />
					</PanelBody>
					<PanelColorSettings title={ __( 'Background Color Setting', 'kbl' ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: backgroundColor.color,
								label: __( 'Background Color', 'kbl' ),
								onChange: setBackgroundColor,
								disableCustomColors : true,
							},
						] } >
						<RangeControl label={ __( 'Opacity', 'kbl' ) }
									  value={ attributes.opacity }
									  min={ 0 } max={ 100 }
									  onChange={ val => setAttributes( { opacity: val } ) }
						/>
					</PanelColorSettings>
					<PanelBody title={ __( 'Background Image', 'kbl' ) } initialOpen={ true }>
						{ attributes.backgroundImage ? (
							<p style={ { textAlign: 'center' } }>
								<img style={{ maxWidth: '100%', width: 'auto', height: 'auto' }} className='kbl-section-background-sample' src={ attributes.backgroundImage } alt='' />
							</p>
						) : (
							<p className='kbl-section-background-desc description'>
								{ __( 'Set background image for section.', 'kbl' ) }
							</p>
						) }
						<MediaUpload
							onSelect={ ( imageObject ) => {
								let image = imageObject.sizes.full.url;
								if ( imageObject.sizes['full-width'] ) {
									image = imageObject.sizes['full-width'].url;
								}
								setAttributes( { backgroundImage: image } );
							} }
							type="image"
							value={ attributes.backgroundImage }
							render={ ( { open } ) => (
								<p>
									<Button isDefault onClick={ open }>
										{ __( 'Select Image', 'kbl' ) }
									</Button>
									{ attributes.backgroundImage ? (
										<Button isTertiary onClick={ () => setAttributes( { backgroundImage: '' } ) }>
											{ __( 'Clear', 'kbl' ) }
										</Button>
									) : null }
								</p>
							)}
						/>

						<RangeControl label={ __( 'Blur', 'kbl' ) }
									  value={ attributes.blur }
									  min={0} max={20}
									  onChange={ val => setAttributes( { blur: val } ) }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Hidden Contents', 'kbl' ) }>
						<ToggleControl checked={ attributes.more } label={ __( 'Hide Contents', 'kbl' ) }
							onChange={ ( more ) => setAttributes( { more } ) }
							help={ __( 'If checked, contents will be hidden.', 'kbl' ) } />
						<TextControl type="number" value={ attributes.height } label={ __( 'Preview Height', 'kbl' ) }
					 		onChange={ ( height ) => setAttributes( { height } ) } />
						<TextControl type="text" value={ attributes.label } label={ __( 'Label for revealing button.', 'kbl' ) }
							onChange={ ( label ) => setAttributes( { label} ) }
							placeholder={ __( 'e.g. Read More', 'kbl' ) }/>

					</PanelBody>
				</InspectorControls>
				<section className={ classNameFromAttributes( className, attributes ) } style={ sectionStyle( attributes ) }>
					{ attributes.blur ? (
						<div className='kbl-section-blur' style={ getBlurStyle( attributes ) } />
					) : null }
					<div className={ setBgClass( attributes ) } style={ { opacity: attributes.opacity / 100 } } />
					<div className={ attributes.hasContainer? KblSection.container_class : KblSection.no_container_class }>
						<InnerBlocks />
					</div>
					{ attributes.more && (
						<button className="kbl-section-more">
							<span className="kbl-section-more-label">{ attributes.label || __( 'Read More', 'kbl' ) }</span>
						</button>
					) }
				</section>
			</>
		);
	} ),

	save( { className, attributes } ) {
		let bgClass = 'wp-block-kunoichi-section-bg';
		if ( attributes.backgroundColor ) {
			bgClass += ' has-background-color has-' + attributes.backgroundColor + '-background-color';
		}
		className += attributes.full ? ' section-full' : ' section-not-full';
		const hasBlur   = attributes.blur && attributes.backgroundImage;
		if ( hasBlur ) {
			className += ' blur';
		}
		const styles = {
			padding: sprintf( '%dpx %dpx', attributes.paddingVertical, attributes.paddingHorizontal ),
			backgroundImage: sprintf( 'url(\'%s\')', attributes.backgroundImage ),
		};
		if ( attributes.more ) {
			className += ' has-more-button';
			styles.maxHeight = sprintf( '%dpx', attributes.height );
		}
		return <section className={ className } style={ styles }>
			{ hasBlur ? (
				<div className='wp-block-kunoichi-section-blur' style={ getBlurStyle( attributes ) } />
			) : null }
			<div className={ bgClass } style={ { opacity: attributes.opacity / 100 } } />
			<div className={ ! attributes.full ? 'container' : 'no-container'}>
				<InnerBlocks.Content />
			</div>
			{ attributes.more && (
				<button className="kbl-section-more">
					<span className="kbl-section-more-label">{ attributes.label || __( 'Read More', 'kbl' ) }</span>
				</button>
			) }
		</section>;
	}
} );
