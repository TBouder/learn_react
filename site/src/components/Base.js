/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Base.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
<<<<<<< HEAD
/*   Updated: 2016/12/27 16:23:43 by tbouder          ###   ########.fr       */
=======
/*   Updated: 2017/01/12 22:47:51 by tbouder          ###   ########.fr       */
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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
			// if (n <= 8 || n >= 22)
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
					<div className='ui inverted segment navbar'>
						<div className='ui inverted secondary menu'>
<<<<<<< HEAD
							<h2 className='ui header active item hello_title'>Hello {this.state.currentUser.displayName} !</h2>
							<div className='item right'>
								{this.state.compo}
							</div>
						</div>

						<div className='ui inverted secondary menu navbar_menu'>
							<Link to="/"><a className={this.props.location.pathname == "/" ? "active item" : "item"}>Home</a></Link>
							<Link to="/count"><a className={this.props.location.pathname == "/count" ? "active item" : "item"}>Counter</a></Link>
							<Link to="/todo"><a className={this.props.location.pathname == "/todo" ? "active item" : "item"}>Todo-list</a></Link>
						</div>
=======
							<h5 className='ui header active item '>Hello {this.state.currentUser.displayName} !</h5>
							<div className='ui inverted secondary menu navbar_menu'>
								<Link to="/"><a className={this.props.location.pathname == "/" ? "active item" : "item"}><h4>Home</h4></a></Link>
								<Link to="/count"><a className={this.props.location.pathname == "/count" ? "active item" : "item"}><h4>Counter</h4></a></Link>
								<Link to="/todo"><a className={this.props.location.pathname == "/todo" ? "active item" : "item"}><h4>Todo</h4></a></Link>
							</div>
							<div className='item right navbar_right'>
								{this.state.compo}
							</div>
						</div>
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
					</div>
				</header>

				<div>{this.props.children}</div>

				<footer>
<<<<<<< HEAD
					<div className="text_center padding_ten">
=======
					<div className="center padding_ten">
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
						<strong>React</strong> and <strong>Express</strong> by <strong>Tbouder</strong>.
					</div>
				</footer>
			</div>
		);
	}
}
