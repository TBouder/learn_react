/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Is_not_connected.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2017/01/12 22:40:02 by tbouder          ###   ########.fr       */
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
