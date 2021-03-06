/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   webpack.config.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:37:12 by tbouder           #+#    #+#             */
<<<<<<< HEAD
/*   Updated: 2016/10/06 13:59:54 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
=======
/*   Updated: 2017/01/12 21:30:19 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const	webpack = require('webpack');
const	path = require('path');
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6

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
<<<<<<< HEAD
			},
			{
				test: /\.css/,
				loaders: ['style', 'css'],
				include: path.join(__dirname, 'src', 'components')
=======
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
			}
		]
	},
	plugins: [
<<<<<<< HEAD
		new ExtractTextPlugin("main.css",  {allChunks: true}),
=======
		new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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
