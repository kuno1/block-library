/*!
 * Enhanced section blocks.
 * wpdeps=wp-blocks,kbl,wp-block-editor, wp-components, wp-hooks, wp-url
 */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { addQueryArgs } = wp.url;
const { applyFilters } = wp.hooks;
const { PanelBody, ToggleControl, TextControl, Button, RangeControl } = wp.components;
const { InnerBlocks, withColors, InspectorControls, PanelColorSettings, MediaUpload } = wp.blockEditor;

/* global KblSection: false */

/**
 * Get blur attributes.
 *
 * @param {Object} attributes
 * @return {{filter: string, top: string, left: string, bottom: string, right: string}} Style object.
 */
const getBlurStyle = ( attributes ) => {
	const blurPadding = attributes.blur * -1 + 'px';
	return {
		left: blurPadding,
		right: blurPadding,
		top: blurPadding,
		bottom: blurPadding,
		filter: `blur( ${ attributes.blur }px )`
	}
};

const classNameFromAttributes = ( className, attributes ) => {
	className = className ? [ className, 'kbl-section' ] : [ 'kbl-section' ];
	if ( attributes.blur ) {
		className.push( 'has-blur' );
	}
	if ( attributes.more ) {
		className.push( 'has-more-button' );
	}
	if ( attributes.minHeight ) {
		className.push( 'has-min-height' );
	}
	className = applyFilters( 'kbl.section.className', className, attributes );
	return className.join( ' ' );
};

const setBgClass = ( attributes ) => {
	const classNames = [ 'kbl-section-bg' ];
	if ( attributes.backgroundColor ) {
		classNames.push( 'has-background-color' );
		classNames.push( `has-${ attributes.backgroundColor }-background-color` );
	}
	return classNames.join( ' ' );
};

const sectionStyle = ( attributes ) => {
	const styles = {};
	if ( attributes.paddingVertical || attributes.paddingHorizontal ) {
		styles.padding = sprintf( '%dpx %dpx', attributes.paddingVertical, attributes.paddingHorizontal );
	}
	if ( attributes.backgroundImage && attributes.backgroundImage.length ) {
		styles.backgroundImage = sprintf( 'url(\'%s\')', attributes.backgroundImage );
	}
	if ( 0 < attributes.minHeight ) {
		styles.minHeight = sprintf( '%dvh', attributes.minHeight );
	}
	return styles;
};

const getVideoTag = ( attributes ) => {
	if ( ! attributes.movie ) {
		return null;
	}
	let provider = '';
	let id = '';
	if ( attributes.movie.match( /https?:\/\/www.youtube.com.*v=(.*)/ ) ) {
		provider = 'youtube';
		id = RegExp.$1;
	} else if ( attributes.movie.match( /https:\/\/youtu.be\/(.*[^?])/ ) ) {
		provider = 'youtube';
		id = RegExp.$1;
	}

	switch ( provider ) {
		case 'youtube':
			const playerUrl = addQueryArgs( sprintf( 'https://www.youtube.com/embed/%s', id ), {
				autoplay: 1,
				loop: attributes.loop ? 1 : 0,
				playlist: id,
				controls: 0,
				enablejsapi: 1,
				modestbranding: 1,
				origin: window.location.hostname,
				playsinline: 1,
				fs: 0,
				mute: 1,
			} );
			return (
				<div className="kbl-section-youtube-container">
					<iframe className="kbl-section-youtube"  name="movie" title="" src={ playerUrl} />
				</div>
			);
		default:
			return (
				<video className="kbl-section-video" autoPlay={ true } muted={ true } playsInline={ true } poster={ attributes.backgroundImage || null } loop={ attributes.repeat }>
					<source className="kbl-section-video-source" src={ attributes.movie } />
				</video>
			);
	}
};

registerBlockType( 'kunoichi/section', {

	title: __( 'Section', 'kbl' ),

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
		minHeight: {
			type: 'number',
			default: 0,
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
		movie: {
			type: 'string',
			default: '',
		},
		repeat: {
			type: 'boolean',
			default: true,
		}
	},

	edit: withColors( 'backgroundColor' )( ( props ) => {
		const { attributes, setAttributes, className, backgroundColor, setBackgroundColor } = props;
		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Layout', 'kbl' ) } initialOpen={ false }>
						{ applyFilters( 'kbl.section.layout', <>
							<ToggleControl label={ __( 'Container inside', 'kbl' ) } checked={ attributes.hasContainer }
								onChange={ ( hasContainer ) => setAttributes( { hasContainer } ) }
								help={ __( 'If checked, container will be inside.', 'kbl' ) } />
							<TextControl label={ __( 'Vertical Padding', 'kbl' ) } value={ attributes.paddingVertical }
								type="number"
								onChange={ value => setAttributes( { paddingVertical: parseInt( value, 10 ) } ) } />
							<TextControl label={ __( 'Horizontal Padding', 'kbl' ) }
								value={ attributes.paddingHorizontal } type="number"
								onChange={ value => setAttributes( { paddingHorizontal: parseInt( value, 10 ) } ) } />
							<TextControl label={ __( 'Vertical Height', 'kbl' ) }
								value={ attributes.minHeight } type="number"
								onChange={ minHeight => setAttributes( { minHeight: parseInt( minHeight, 10 ) } ) }
								help={ __( 'Percentage of window height. For example, If set to 100, this block will have 100% of window height.', 'kbl' ) } />
						</>, props ) }
					</PanelBody>
					<PanelColorSettings title={ __( 'Background Color Setting', 'kbl' ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: backgroundColor.color,
								label: __( 'Background Color', 'kbl' ),
								onChange: setBackgroundColor,
								disableCustomColors: true,
							},
						] }>
						<RangeControl label={ __( 'Opacity', 'kbl' ) }
							value={ attributes.opacity }
							min={ 0 } max={ 100 }
							onChange={ val => setAttributes( { opacity: val } ) }
						/>
					</PanelColorSettings>
					<PanelBody title={ __( 'Background Image', 'kbl' ) } initialOpen={ true }>
						{ attributes.backgroundImage ? (
							<p style={ { textAlign: 'center' } }>
								<img style={ { maxWidth: '100%', width: 'auto', height: 'auto' } }
									className='kbl-section-background-sample' src={ attributes.backgroundImage }
									alt='' />
							</p>
						) : (
							<p className='kbl-section-background-desc description'>
								{ __( 'Set background image for section.', 'kbl' ) }
							</p>
						) }
						<MediaUpload
							onSelect={ ( imageObject ) => {
								let image = imageObject.sizes.full.url;
								if ( imageObject.sizes[ 'full-width' ] ) {
									image = imageObject.sizes[ 'full-width' ].url;
								}
								setAttributes( { backgroundImage: image } );
							} }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<p>
									<Button isSecondary onClick={ open }>
										{ __( 'Select Image', 'kbl' ) }
									</Button>
									{ attributes.backgroundImage ? (
										<Button isTertiary onClick={ () => setAttributes( { backgroundImage: '' } ) }>
											{ __( 'Clear', 'kbl' ) }
										</Button>
									) : null }
								</p>
							) }
						/>

						<RangeControl label={ __( 'Blur', 'kbl' ) }
							value={ attributes.blur }
							min={ 0 } max={ 20 }
							onChange={ val => setAttributes( { blur: val } ) }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Background Movie', 'kbl' ) } initialOpen={ false }>
						<TextControl label={ __( 'Movie URL', 'kbl' ) } value={ attributes.movie } placeholder="https://example.com/movie.mov"
							type="url" help={ __( 'Enter movie file URL. YouTube is also supported.', 'kbl' ) }
							onChange={ movie => setAttributes( { movie } ) } />
						<MediaUpload
							onSelect={ ( { url } ) => {
								setAttributes( { movie: url } );
							} }
							allowedTypes={ [ 'video' ] }
							render={ ( { open } ) => (
								<p>
									<Button isSecondary onClick={ open }>
										{ __( 'Select Uploaded Video', 'kbl' ) }
									</Button>
									{ attributes.movie ? (
										<Button isTertiary onClick={ () => setAttributes( { movie: '' } ) }>
											{ __( 'Clear', 'kbl' ) }
										</Button>
									) : null }
								</p>
							) }
						/>
						<ToggleControl checked={ attributes.repeat } label={ __( 'Repeat', 'kbl' ) } onChange={ repeat => setAttributes( { repeat } ) } />
					</PanelBody>
					<PanelBody title={ __( 'Hidden Contents', 'kbl' ) }>
						<ToggleControl checked={ attributes.more } label={ __( 'Hide Contents', 'kbl' ) }
							onChange={ ( more ) => setAttributes( { more } ) }
							help={ __( 'If checked, contents will be hidden.', 'kbl' ) } />
						<TextControl type="number" value={ attributes.height } label={ __( 'Preview Height', 'kbl' ) }
							onChange={ ( height ) => setAttributes( { height } ) } />
						<TextControl type="text" value={ attributes.label }
							label={ __( 'Label for revealing button.', 'kbl' ) }
							onChange={ ( label ) => setAttributes( { label } ) }
							placeholder={ __( 'e.g. Read More', 'kbl' ) } />

					</PanelBody>
				</InspectorControls>
				<section className={ classNameFromAttributes( className, attributes ) }
					style={ sectionStyle( attributes ) }>
					{ attributes.blur ? (
						<div className='kbl-section-blur' style={ getBlurStyle( attributes ) } />
					) : null }
					{ getVideoTag( attributes ) }
					<div className={ setBgClass( attributes ) } style={ { opacity: attributes.opacity / 100 } } />
					<div
						className={ attributes.hasContainer ? KblSection.container_class : KblSection.no_container_class }>
						<InnerBlocks />
					</div>
					{ attributes.more && (
						<button className="kbl-section-more">
							<span
								className="kbl-section-more-label">{ attributes.label || __( 'Read More', 'kbl' ) }</span>
						</button>
					) }
				</section>
			</>
		);
	} ),

	save( { attributes } ) {
		let bgClass = 'wp-block-kunoichi-section-bg';
		if ( attributes.backgroundColor ) {
			bgClass += ' has-background-color has-' + attributes.backgroundColor + '-background-color';
		}
		const classNames = classNameFromAttributes( null, attributes );
		const styles = sectionStyle( attributes );
		if ( attributes.more ) {
			styles.maxHeight = sprintf( '%dpx', attributes.height );
		}

		return <section className={ classNames } style={ styles }>
			{ attributes.blur ? (
				<div className='wp-block-kunoichi-section-blur' style={ getBlurStyle( attributes ) } />
			) : null }
			{ getVideoTag( attributes ) }
			<div className={ bgClass } style={ { opacity: attributes.opacity / 100 } } />
			<div className={ attributes.hasContainer ? KblSection.container_class : KblSection.no_container_class }>
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
