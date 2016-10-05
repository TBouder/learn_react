/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   webpack.config.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:37:12 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/05 13:24:07 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const webpack = require('webpack');
const path = require('path');

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
		loaders: [
		{
			test: path.join(__dirname, 'src'),
			loader: ['babel-loader'],
			query:{cacheDirectory: 'babel_cache'}
		},
		{
			test: /\.css/,
			loaders: ['style', 'css'],
        	include: __dirname + '/src/static'
		}]
	},
	plugins: [
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
