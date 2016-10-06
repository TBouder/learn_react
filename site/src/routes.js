/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:46:57 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/06 14:09:32 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React				from 'react'
import {Route, IndexRoute}	from 'react-router'
import base					from './components/base';
import index				from './components/index';
import page_not_found		from './components/page_not_found';
import count				from './components/count';
import todo					from './components/todo';

/*******************************************************************************
** See more infos : https://goo.gl/lKlASR
** - Route path=[XX] component=[YY]	>> The path XX leads to the component YY
** - IndexRoute						>> "Default" page
**
** First of all, we load the base page (aka the common part of all pages). The
** ['/'] means all pages stating by ['/'] after the domain name (localhost:8080)
** Then we load the default page, index, with IndexRoute.
** Last, we load all the pages, ending by ['*'], with means all the others
*******************************************************************************/
const routes = (
	<Route path="/" component={base}>
		<IndexRoute component={index}/>
		<Route path="/count" component={count}/>
		<Route path="/todo" component={todo}/>
		<Route path="*" component={page_not_found}/>
	</Route>
);

export default routes;
