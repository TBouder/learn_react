/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Base.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/28 02:07:20 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React				from 'react';
import {Link}				from 'react-router';
import Firebase				from 'firebase';
import {Route, IndexRoute}	from 'react-router'
import Is_connected			from './Navbar/Is_connected';
import Is_not_connected		from './Navbar/Is_not_connected';

export default class Base extends React.Component
{
	constructor(props)
	{
		super(props);
		var THIS = this;
		this.state = {compo: "", currentUser: "", logged_in: 0};
		this.componentWillReceiveProps(this.props);

		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
				THIS.setState({logged_in: 1, currentUser: user})
		});
		function night_theme()
		{
			var n = new Date().getHours();
			if (n <= 8 || n >= 22)
				document.body.style.backgroundColor = "#263248";
		}
		/*Switch to night mode by night*/
		night_theme();
	}

	componentWillReceiveProps(nextProps)
	{
		var THIS = this;
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
				THIS.setState({compo: <Is_connected user={user}/>});
			else
				THIS.setState({compo: <Is_not_connected/>});
		});
	}

	render()
	{
		return (
			<div>
				<header>
					<div className="ui inverted segment full_width">
						<div className="ui inverted secondary pointing menu">
							<h4 className="item">Hello {this.state.currentUser.displayName} !</h4>
							<Link to="/"><span className={this.props.location.pathname == "/" ? "active item" : "item"}>Home</span></Link>
							<Link to="/count"><span className={this.props.location.pathname == "/count" ? "active item" : "item"}>Counter</span></Link>
							<Link to="/todo"><span className={this.props.location.pathname == "/todo" ? "active item" : "item"}>Todo-list</span></Link>

							{this.state.compo}
						</div>
					</div>
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
