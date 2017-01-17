/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Account.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/12 14:30:48 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/16 14:50:31 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import Login_page		from './Account/Login_page';
import User_page		from './Account/User_page';
import Create_account	from './Account/Create_account';

export default class Account extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {compo: ""};
		this.componentWillReceiveProps(this.props);
	}

	componentWillReceiveProps(nextProps)
	{
		var THIS = this;
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
				THIS.setState({compo: <User_page/>});
			else if (THIS.props.location.query.page == "sign_up")
				THIS.setState({compo: <Create_account/>});
			else
				THIS.setState({compo: <Login_page/>});
		});
	}

	render()
	{
		return (<div>{this.state.compo}</div>)
	}
}
