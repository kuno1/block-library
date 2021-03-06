const LicenseWebpackPlugin = require( 'license-webpack-plugin' ).LicenseWebpackPlugin;

module.exports = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						plugins: [ '@babel/plugin-transform-react-jsx' ],
					},
				},
			},
		],
	},
	plugins: [
		new LicenseWebpackPlugin(),
	],
	devtool: 'source-map',
};
