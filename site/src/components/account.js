/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   account.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/12 14:30:48 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/12 16:27:03 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React		from 'react';
import {Link}		from 'react-router';
import Firebase 	from 'firebase';
import Login		from './login';
import Todo			from './todo';

export default class account extends React.Component
{
	constructor()
	{
		super();
		var THIS = this;
		this.state = {logged_in: 0};

		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
				THIS.setState({logged_in: 1})
		});
	}
	render()
	{
		if (this.state.logged_in == 1)
			return (<Todo/>);
		else
			return (<Login/>);
	}
}
