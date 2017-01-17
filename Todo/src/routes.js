/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:46:57 by tbouder           #+#    #+#             */
/*   Updated: 2017/01/17 18:18:45 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React				from 'react'
import {Route, IndexRoute}	from 'react-router'
import Base					from './components/Base';
import Page_not_found		from './components/Page_not_found';
import Account				from './components/Account';
import Todo					from './components/Todo/Todo';

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
	<Route path="/" component={Base}>
		<IndexRoute component={Todo}/>
		<Route path="/account" component={Account}/>
		<Route path="*" component={Page_not_found}/>
	</Route>
);

export default routes;
