/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AppRoutes.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:55:20 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/04 20:50:15 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React					from 'react';
import {Router, browserHistory}	from 'react-router';
import routes					from '../routes';

class AppRoutes extends React.Component
{
	render()
	{
		return (
			<Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
		);
	}
}

export default AppRoutes;
