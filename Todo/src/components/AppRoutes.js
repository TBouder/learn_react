/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AppRoutes.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:55:20 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/05 23:38:47 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React					from 'react';
import {Router, browserHistory}	from 'react-router';
import routes					from '../routes';

export default class AppRoutes extends React.Component
{
	render()
	{
		return (
			<Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
		);
	}
}
