/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Is_connected.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/28 01:54:19 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React				from 'react';
import {Link}				from 'react-router';
import Firebase				from 'firebase';
import {Route, IndexRoute}	from 'react-router'

export default class Is_connected extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {currentUser: this.props.user, logged_in: 1};
		this.ft_logout = this.ft_logout.bind(this);
	}

	ft_logout()
	{
		var THIS = this;
		firebase.auth().signOut().then(function()
		{
			THIS.setState({logged_in: 0});
			THIS.setState({currentUser: null});
		});
	}

	render()
	{
		return (
			<div className="right menu">
				<Link to="/account">
					<button className="ui icon teal button">
						<h5>Account</h5>
					</button>
				</Link>
				<button className="ui icon red button" onClick={this.ft_logout}>
					<h5><i className="icon power"></i></h5>
				</button>
			</div>
		);
	}
}
