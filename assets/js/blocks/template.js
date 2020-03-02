/*!
 * wpdeps=wp-blocks, kbl, wp-editor
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;



registerBlockType( 'kunoichi/template-card', {

	title: __( 'Template', 'kbl' ),

	icon: 'yes',

	category: 'formatting',

	description: __( 'Card block inside template block.', 'kbl' ),

	parent: [ 'kunoichi/template' ],

	edit( { attributes, setAttributes, className } ) {
		className += ' kunoichi-template-card';
		return (
			<div className={ className }>
				<InnerBlocks templateLock={ true } template={ [
					[ 'core/image' ],
					[ 'core/heading', { level: 3, align: 'center' } ],
					[ 'core/paragraph', { align: 'center' } ],
				] } />
			</div>
		);
	},

	save() {
		return <div className={ 'kunoichi-template-card' }><InnerBlocks.Content /></div>;
	}
} );

registerBlockType( 'kunoichi/template', {

	title: __( 'Template', 'kbl' ),

	icon: 'yes',

	category: 'formatting',

	description: __( 'Display the template block.', 'kbl' ),

	edit( { attributes, setAttributes, className } ) {
		return <div className={ className }>
			<InnerBlocks allowedBlocks={ [ 'kunoichi/template-card' ] } />
		</div>
	},

	save( { attributes } ) {
		return <div className={ 'kunoichi-template' }>
			<InnerBlocks.Content />
		</div>
	}
} );
