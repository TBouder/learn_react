/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Login_page.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/12/09 01:58:36 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';
import Firebase from 'firebase';

export default class Login_page extends React.Component
{
	constructor()
	{
		super();
		this.state =
		{
			login: "",
			passwd: "",
			status: ""
		};
		this.ft_change_login = this.ft_change_login.bind(this);
		this.ft_change_passwd = this.ft_change_passwd.bind(this);
		this.ft_send_login = this.ft_send_login.bind(this);
	}

	ft_change_login(event)	{this.setState({login: event.target.value});}
	ft_change_passwd(event)	{this.setState({passwd: event.target.value});}
	ft_catch_enter(e)		{e.charCode == 13 || e.keyCode == 13 ? this.ft_send_login() : false;}

	ft_send_login()
	{
		String.prototype.capitalizeFirstLetter = function() {return this.charAt(0).toUpperCase() + this.slice(1);}
		const	auth = firebase.auth();
		const	db = firebase.database();
		var		THIS = this;
		var		username = THIS.state.login.capitalizeFirstLetter();

		function ft_create_error_message(code, message)
		{
			return (
				<div className="ui negative message">
					<div className="header">
						{code}
					</div>
					<p>{message}</p>
				</div>
			)
		}

		db.ref("/users/" + username).on("value", function(snapshot)
		{
			var new_user = snapshot.val()
			if (new_user)
			{
				auth.signInWithEmailAndPassword(new_user.email, THIS.state.passwd).then(function(user)
				{
					;
				}).catch(function(error)
				{
					THIS.setState({status: ft_create_error_message(error.code, error.message)});
				});
			}
			else
			{
				THIS.setState({status: ft_create_error_message("auth/wrong-username", "The username is invalid.")});
			}
		});
	}

	render()
	{
		return (
			<div>
				<div className="text_center padding_five page_center">
					{this.state.status}
					<div className="ui cards centered">
						<div className="card">
							<div className="content">
								<div className="header">Login</div>
								<div className="description">
									<div className="ui fluid input">
										<input type="text" value={this.state.login} placeholder="Login" onChange={this.ft_change_login} onKeyPress={this.ft_catch_enter.bind(this)}/>
									</div>
									<br/>
									<div className="ui fluid input">
										<input type="password" value={this.state.passwd} placeholder="Password" onChange={this.ft_change_passwd} onKeyPress={this.ft_catch_enter.bind(this)}/>
									</div>
								</div>
							</div>
							<div className="ui bottom attached button login_button" onClick={this.ft_send_login.bind(this)}>
								Connect
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
