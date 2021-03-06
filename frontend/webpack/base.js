const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => ({
	entry: path.resolve(__dirname, '../src/index.tsx'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js'
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/
			},
			{
				test: /.(jpg|gif|jpeg|png|svg|ttf|eot|otf|woff|woff2)$/,
				oneOf: [
					{
						loader: 'file-loader?name=res/[name].[ext]'
					}
				]
			}
		]
	},

	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.ts', '.tsx']
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}),
		new CleanWebpackPlugin()
	]
});
