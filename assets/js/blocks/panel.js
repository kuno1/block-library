/*!
 * wpdeps=wp-blocks, kbl, wp-editor, wp-components, wp-hooks
 */

const { registerBlockType } = wp.blocks;
const { __, sprintf } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls, withColors, PanelColorSettings } = wp.editor;
const { G, Path, SVG, Rect, PanelBody, TextControl, SelectControl, ToggleControl } = wp.components;

const getClassName = ( attributes, className = '' ) => {
	const classes = [ 'kbl-panel' ];
	if ( className ) {
		classes.push( className );
	}
	if ( attributes.icon ) {
		classes.push( 'has-icon' );
	}
	if ( attributes.panelColor ) {
		classes.push( 'has-panel-color' );
		classes.push( sprintf( 'has-%s-panel-color', attributes.panelColor ) );
	} else {
		classes.push( 'no-panel-color' );
	}
	return classes.join( ' ' );
};

registerBlockType( 'kunoichi/panel', {

	title: __( 'Panel', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<Rect x="1.5" y="1.5" width="17" height="17" rx="1.5" style={ { fill:"#fff" } }/>
			<Path d="M17,2a1,1,0,0,1,1,1V17a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H17m0-1H3A2,2,0,0,0,1,3V17a2,2,0,0,0,2,2H17a2,2,0,0,0,2-2V3a2,2,0,0,0-2-2Z" style={ { fill:"#444" } }/>
			<line x1="1.5" y1="5.5" x2="18.5" y2="5.5" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="5.16" y1="7.71" x2="17.5" y2="7.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="3.16" y1="7.71" x2="4.5" y2="7.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="5.16" y1="10.71" x2="17.5" y2="10.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="3.16" y1="10.71" x2="4.5" y2="10.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="5.16" y1="13.71" x2="17.5" y2="13.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="3.16" y1="13.71" x2="4.5" y2="13.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="5.16" y1="16.71" x2="17.5" y2="16.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
			<line x1="3.16" y1="16.71" x2="4.5" y2="16.71" style={ { fill: 'none', stroke:"#444",strokeMiterlimit:10 } }/>
		</SVG>
	),

	category: 'formatting',

	description: __( 'Panel block for emphasized and separated contents.', 'kbl' ),

	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.kbl-panel-title',
			default: [],
		},
		level: {
			type: 'number',
			default: 3,
		},
		icon: {
			type: 'string',
			default: '',
		},
		panelColor: {
			type: 'string',
		},
	},

	edit: withColors( 'panelColor' )( ( { attributes, setAttributes, className, panelColor, setPanelColor } ) => {
		return (
			<>
				<InspectorControls>

					<PanelColorSettings title={ __( 'Panel Options', 'kbl' ) } colorSettings={ [ {
						value: panelColor.color,
						label: __( 'Panel Color', 'kbl' ),
						onChange: setPanelColor,
					} ] } initialOpen={ true }>

						<SelectControl value={ attributes.level }
							options={ [ 1, 2, 3, 4, 5, 6 ].map( ( level ) => {
								return {
									label: sprintf( 'H%d', level ),
									value: level,
								};
							} ) }
							label={ __( 'Heading Level', 'kbl' ) }
							onChange={ ( level ) => setAttributes( { level: parseInt( level ) } ) }/>
					</PanelColorSettings>
				</InspectorControls>
				<div className={ getClassName( attributes, className ) }>
					<header className='kbl-panel-heading'>
						<RichText tagName={ 'h' + attributes.level } className="kbl-panel-title"
								  value={ attributes.title }
								  multiline={ false }
								  keepPlaceholderOnFocus={ true } placeholder={ __( 'Panel Heading', 'kbl' ) }
								  onChange={ ( title ) => setAttributes( { title } ) }/>
					</header>
					<div className="kbl-panel-body">
						<InnerBlocks />
					</div>
				</div>
			</>
		);
	} ),

	save( { attributes } ) {
		return (
			<div className={ getClassName( attributes ) }>
				<header className='kbl-panel-heading'>
					<RichText.Content tagName={ 'h' + attributes.level } className="kbl-panel-title"
						value={ attributes.title }
						multiline={ false } />
				</header>
				<div className="kbl-panel-body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
} );