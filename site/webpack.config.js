/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   webpack.config.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:37:12 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/06 13:59:54 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =
{
	entry: path.join(__dirname, 'src', 'app-client.js'),
	output:
	{
		path: path.join(__dirname, 'src', 'static', 'js'),
		filename: 'bundle.js'
	},
	module:
	{
		loaders:
		[
			{
				test: path.join(__dirname, 'src'),
				loader: ['babel-loader'],
				query:{cacheDirectory: 'babel_cache'}
			},
			{
				test: /\.css/,
				loaders: ['style', 'css'],
				include: path.join(__dirname, 'src', 'components')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("main.css",  {allChunks: true}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(
		{
			compress: {warnings: false},
			mangle: true,
			sourcemap: false,
			beautify: false,
			dead_code: true
		})
	]
};
