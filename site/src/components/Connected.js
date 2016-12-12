/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Connected.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/12 14:30:48 by tbouder           #+#    #+#             */
/*   Updated: 2016/12/11 16:08:26 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import Login_page		from './Account/Login_page';
import Todo				from './Connected/Todo/Todo';
import Count			from './Connected/Count';
import Projects			from './Connected/Projects';
import Add_project		from './Connected/Add_project';
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
			if (!user)
				THIS.setState({compo: <Login_page/>});
			else if (THIS.props.location.pathname == "/todo")
				THIS.setState({compo: <Todo user={user}/>});
			else if (THIS.props.location.pathname == "/count")
				THIS.setState({compo: <Count/>});
			else if (THIS.props.location.pathname == "/projects")
				THIS.setState({compo: <Projects/>});
			else if (THIS.props.location.pathname == "/add_project")
				THIS.setState({compo: <Add_project/>});
			else
				THIS.setState({compo: <Page_not_found/>});
		});
	}

	render()
	{
		return (<div>{this.state.compo}</div>)
	}
}
