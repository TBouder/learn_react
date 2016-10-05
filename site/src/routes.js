/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:46:57 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/05 01:16:42 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React				from 'react'
import {Route, IndexRoute}	from 'react-router'
import Layout				from './components/Layout';
import IndexPage			from './components/IndexPage';
import page_not_found		from './components/page_not_found';

/*******************************************************************************
** - Route path=[XX] component=[YY]	>> The path XX leads to the component YY
** - IndexRoute						>> "Default" page
*******************************************************************************/
const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="*" component={page_not_found}/>
  </Route>
);

export default routes;
