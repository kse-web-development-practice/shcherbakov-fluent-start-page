/* eslint-disable no-undef */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (env) => ({
	mode: env.dev ? 'development' : 'production',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: env.dev ? 'eval-source-map' : 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public')
		},
		port: 3000,
		compress: false,
		// Для легшої маршрутизації
		historyApiFallback: {
			index: 'index.html'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			inject: false // Зупинити дублювання стилів https://stackoverflow.com/a/75313687
		}),
		new EslintWebpackPlugin({
			exclude: ['node_modules', 'dist', 'public'],
			context: path.resolve(__dirname, 'src'),
			emitWarning: env.dev !== true,
			emitError: env.dev !== true
		}),
		new DefinePlugin({
			'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL)
		})
	],
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							esModule: false,
							modules: {
								auto: /\.module\.(sa|sc|c)ss$/i,
								localIdentName: '[local]--[name]--[hash:base64:5]'
							}
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
			}
		]
	}
});
