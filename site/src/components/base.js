/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   base.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/12 12:28:03 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';
import Firebase from 'firebase';

export default class base extends React.Component
{
	constructor()
	{
		super();
		var THIS = this;
		this.state = {user_is_logged_in: ""};

		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				function ft_display_username(user)
				{
					return (<h2 className="ui center aligned icon header">Hello {user.displayName}</h2>)
				}
				THIS.setState({user_is_logged_in: ft_display_username(user)});
				console.log(user.uid);
			}
		});
	}

	render()
	{
		return (
			<div>
				<header>
					<img className="ui centered image padding_two" src="/img/logo.png" />
					<Link to="/"><h2 className="text_center">React + Node_js : server side</h2></Link>
					{this.state.user_is_logged_in}
				</header>

				<div>{this.props.children}</div>

				<footer>
					<div className="text_center padding_ten">
						<strong>React</strong> and <strong>Express</strong> by <strong>Tbouder</strong>.
					</div>
				</footer>
			</div>
		);
	}
}
