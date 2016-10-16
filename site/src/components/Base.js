/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   base.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/16 14:49:07 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';
import Firebase from 'firebase';

export default class Base extends React.Component
{
	constructor()
	{
		super();
		var THIS = this;
		this.state = {currentUser: firebase.auth().currentUser, logged_in: 0};

		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
				THIS.setState({logged_in: 1})
		});
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
			<div>
				<header>
					<div className="ui inverted segment full_width">
						<div className="ui inverted secondary pointing menu">
							<Link to="/"><span className="active item">Home</span></Link>
							<Link to="/count"><span className="item">Counter</span></Link>
							<Link to="/todo"><span className="item">Todo-list</span></Link>
							<Link to="/404page"><span className="item">404</span></Link>

						{
							this.state.user == null && this.state.logged_in == 0
							?
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
							:
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
						}
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
