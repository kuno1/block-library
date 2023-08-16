/*!
 * This file is for i18n.
 *
 * ＠deps wp-element
 */

window.kbl = {
	/**
	 * Convert line break to br.
	 *
	 * @param {string} text Text to split.
	 * @return {Array} Array of text combiled with <br />.
	 */
	nl2br: ( text ) => {
		const segments = text.split( /\r?\n/ );
		const BRed = [];
		for ( let i = 0, l = segments.length; i < l; i++ ) {
			if ( i ) {
				BRed.push( <br /> );
			}
			BRed.push( segments[ i ] );
		}
		return BRed;
	},

	/**
	 * Convert line break to list.
	 *
	 * @param {string} text Text to split.
	 * @return {Array} Array of li elements.
	 */
	nl2li: ( text ) => {
		return  text.split( /\r?\n/ ).filter( line => line.length ).map( ( line , index) => {
			return <li key={ `li-${index}` }>{ line }</li>
		} );
	},
};
