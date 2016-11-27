/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Connected.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/12 14:30:48 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/27 22:59:58 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import Login_page		from './Account/Login_page';
import Todo				from './Connected/Todo';
import Count			from './Connected/Count';
import Page_not_found	from './Page_not_found';


export default class Connected extends React.Component
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
			console.log(THIS.props.location.pathname);
			if (!user)
				THIS.setState({compo: <Login_page/>});
			else if (THIS.props.location.pathname == "/todo")
				THIS.setState({compo: <Todo/>});
			else if (THIS.props.location.pathname == "/count")
				THIS.setState({compo: <Count/>});
			else
			THIS.setState({compo: <Page_not_found/>});
		});
	}

	render()
	{
		return (<div>{this.state.compo}</div>)
	}
}
