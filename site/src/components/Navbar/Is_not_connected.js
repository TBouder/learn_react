/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Is_not_connected.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
<<<<<<< HEAD
/*   Updated: 2016/11/28 01:55:14 by tbouder          ###   ########.fr       */
=======
/*   Updated: 2017/01/12 22:40:02 by tbouder          ###   ########.fr       */
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
/*                                                                            */
/* ************************************************************************** */

import React				from 'react';
import {Link}				from 'react-router';
import Firebase				from 'firebase';
import {Route, IndexRoute}	from 'react-router'

export default class Is_not_connected extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="right menu">
				<Link to={{pathname: "/account", query: {page: "sign_up" }}}>
					<button className="ui icon teal button">
						<h5>Sign Up</h5>
					</button>
				</Link>
				<Link to="/account">
					<button className="ui icon green button">
						<h5>Sign In</h5>
					</button>
				</Link>
			</div>
		);
	}
}
