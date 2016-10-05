/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 20:48:31 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/05 13:22:18 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*******************************************************************************
** First of all, we will import all the needed modules
*******************************************************************************/
import path						from 'path';
import Express					from 'express';
import React					from 'react';
import {renderToString}			from 'react-dom/server';
import {match, RouterContext}	from 'react-router';
import routes					from './routes';
import page_not_found			from './components/page_not_found';

/*******************************************************************************
** Here is the server and the routes.
** - app.set(name, value)		>> Used to set a value
** - app.use(path, callback)	>> Mount a specified function
** - app.get(path, callback)	>> Routes HTTP GET request
** - match({routes, location}, callback)
*******************************************************************************/
const app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(Express.static(path.join(__dirname, 'static')));

app.get('*', function(request, response)
{
	match({routes, location: request.url}, function (err, renderProps)
	{
		/***********************************************************************
		** - If we get an error, then, error 500
		** - If the page exist, we run it, else, error 404 with te correct page
		***********************************************************************/
		if (err)
			return response.status(500).send(err.message);

		let markup;
		if (renderProps)
			markup = renderToString(<RouterContext {...renderProps}/>);
		else
			markup = renderToString(<page_not_found/>) && response.status(404);
		return (response.render('index', {markup}));
	});
});

/*******************************************************************************
** Let's start the server
*******************************************************************************/
const port = 8080;
app.listen(port);
console.log(`Server running on http://localhost:${port}`);
