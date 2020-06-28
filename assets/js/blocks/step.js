/*!
 * wpdeps=wp-blocks, kbl, wp-block-editor, wp-components
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { G, Path, SVG, Rect, TextControl, TextareaControl } = wp.components;

const nl2br = ( text ) => {
	const segments = text.split( /\r?\n/ );
	const BRed = [];
	for ( let i = 0, l = segments.length; i < l; i++ ) {
		if ( i ) {
			BRed.push( <br /> );
		}
		BRed.push( segments[ i ] );
	}
	return BRed;
};

const getStepCounterClass = ( attributes ) => {
	const classes = [ 'kbl-step-counter' ];
	if ( ! attributes.number ) {
		classes.push( 'kbl-step-counter-empty' );
	}
	return classes.join( ' ' );
};

registerBlockType( 'kunoichi/step', {

	title: __( 'Step', 'kbl' ),

	icon: (
		<SVG viewBox="0 0 20 20">
			<G id="step">
				<Path
					d="M4.23,2.22a3,3,0,1,0,3,3A3,3,0,0,0,4.23,2.22Zm.5,5H4V4.71H3.17V4.23a3.06,3.06,0,0,0,.46,0A.74.74,0,0,0,4,4a.65.65,0,0,0,.14-.26.42.42,0,0,0,0-.14h.59Z" />
				<rect x="8.79" y="3.62" width="10" height="1" style={ { fill: '#231815' } } />
				<Rect x="8.79" y="5.62" width="10" height="1" style={ { fill: '#231815' } } />
				<Rect x="0.93" y="9.93" width="18" height="9" style={ { fill: '#b5b5b6' } } />
			</G>
		</SVG>
	),

	category: 'common',

	description: __( 'Step Block', 'kbl' ),

	parent: [ 'kunoichi/steps' ],

	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.kbl-step-name',
		},
		number: {
			type: 'string',
			default: '',
		},
		direction: {
			type: 'array',
			source: 'children',
			selector: '.kbl-step-direction',
		},
		tips: {
			type: 'string',
			source: 'text',
			selector: '.kbl-step-tip',
		},
		attachment: {
			type: 'integer',
			default: 0,
		},
	},

	edit( { attributes, setAttributes, className } ) {
		className += ' kbl-step-item';
		return (
			<>
				<InspectorControls>
					<TextControl label={ __( 'Step Number', 'kbl' ) } value={ attributes.number }
						onChange={ ( number ) => setAttributes( { number } ) }
						help={ __( 'If empty, automatic counter will be set.', 'kbl' ) } />
					<hr />
					<TextareaControl label={ __( 'Tips', 'kbl' ) }
						help={ __( 'Enter special tips or notes for this step.', 'kbl' ) }
						value={ attributes.tips }
						onChange={ ( tips ) => setAttributes( { tips } ) }
					/>
				</InspectorControls>
				<div className={ className }>
					<div className="kbl-step-header">
						<span className={ getStepCounterClass( attributes ) }>{ attributes.number }</span>
						<RichText tagName={ 'h3' } multiline={ false } className="kbl-step-name"
							keepPlaceholderOnFocus={ true }
							value={ attributes.title } placeholder={ __( 'e.g. Choose a necktie', 'kbl' ) }
							onChange={ ( title ) => setAttributes( { title } ) } />
					</div>
					<div className="kbl-step-body">
						<RichText className="kbl-step-direction" tagName="div" multiline="p"
							onChange={ ( direction ) => setAttributes( { direction } ) }
							placeholder={ __( 'e.g. Open your closet and choose a nice looking necktie.', 'kbl' ) } />
						{ attributes.tips && (
							<p className="kbl-step-tip">{ nl2br( attributes.tips ) }</p>
						) }
					</div>
					<div className="kbl-step-images">
						<InnerBlocks allowedBlocks={ [ 'core/image' ] } />
					</div>
				</div>
			</>
		);
	},

	save( { attributes } ) {
		return (
			<li className="kbl-step-item">
				<div className="kbl-step-header">
					<span className={ getStepCounterClass( attributes ) }>{ attributes.number }</span>
					<RichText.Content tagName={ 'h3' } multiline={ false } className="kbl-step-name"
						value={ attributes.title } />
				</div>
				<div className="kbl-step-body">
					<RichText.Content className="kbl-step-direction" tagName="div" multiline="p"
						value={ attributes.direction } />
					{ attributes.tips && (
						<p className="kbl-step-tip">{ nl2br( attributes.tips ) }</p>
					) }
				</div>
				<div className="kbl-step-images">
					<InnerBlocks.Content />
				</div>
			</li>
		);
	},
} );
