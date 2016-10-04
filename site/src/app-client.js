/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app-client.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:56:12 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/04 20:48:28 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React		from 'react';
import ReactDOM		from 'react-dom';
import AppRoutes	from './components/AppRoutes';

window.onload = function()
{
	ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
