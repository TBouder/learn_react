/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app-client.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:56:12 by tbouder           #+#    #+#             */
/*   Updated: 2017/01/12 21:29:55 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React		from 'react';
import ReactDOM		from 'react-dom';
import AppRoutes	from './components/AppRoutes';

// document.getElementById("main").style.display = 'none';
window.onload = function()
{
		// document.getElementById("main").style.display = 'block';
	ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
