/*!
 * wpdeps=wp-blocks, wp-data, kbl, wp-element, wp-components
 */

const React = wp.element;
const { createBlock } = wp.blocks;
const { select, dispatch } = wp.data;
const { __ } = wp.i18n;
const { IconButton } = wp.components;

kbl.addChild = ( blockName, clientId ) => {
	const block = createBlock( blockName );
	const innerCount = select( 'core/editor' ).getBlocksByClientId( clientId )[0].innerBlocks.length;
	dispatch( 'core/block-editor' ).insertBlocks( block, innerCount, clientId );
};

class ChildInsert extends React.Component {
	render() {
		const { block, clientId } = this.props;
		const label = this.props.label || __( 'Add', 'kbl' );
		const icon  = this.props.icon || 'plus';
		return (
			<div className="kbl-child-insert">
				<IconButton icon={ icon } onClick={ () => kbl.addChild( block, clientId ) } label={ label } />
			</div>
		);
	}
}

kbl.ChildInsert = ChildInsert;
