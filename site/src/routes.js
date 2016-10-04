/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:46:57 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/04 20:49:08 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React				from 'react'
import {Route, IndexRoute}	from 'react-router'
import Layout				from './components/Layout';
import IndexPage			from './components/IndexPage';
import page_not_found		from './components/page_not_found';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="*" component={page_not_found}/>
  </Route>
);

export default routes;
