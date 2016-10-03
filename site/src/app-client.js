/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app-client.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:56:12 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/03 22:56:22 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () =>
{
	ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
