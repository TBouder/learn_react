/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Create_account.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/12/09 02:03:10 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';
import Firebase from 'firebase';

export default class Create_page extends React.Component
{
	constructor()
	{
		super();
		this.state = {email: "", login: "", passwd: "", status: ""};
		this.ft_change_email = this.ft_change_email.bind(this);
		this.ft_change_login = this.ft_change_login.bind(this);
		this.ft_change_passwd = this.ft_change_passwd.bind(this);
		this.ft_create_account = this.ft_create_account.bind(this);
	}


	ft_change_email(event)	{this.setState({email: event.target.value});}
	ft_change_login(event)	{this.setState({login: event.target.value});}
	ft_change_passwd(event)	{this.setState({passwd: event.target.value});}
	ft_catch_enter(e)		{e.charCode == 13 || e.keyCode == 13 ? this.ft_create_account() : false;}

	ft_create_account()
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

		db.ref("/users/" + username).once("value", function(snapshot)
		{
			var new_user = snapshot.val();
			if (!new_user)
			{
				auth.createUserWithEmailAndPassword(THIS.state.email, THIS.state.passwd).then(function(user)
				{
					user.updateProfile({displayName: username, photoURL: "/img/user.svg"});
					firebase.database().ref('/users/' + username).set({
						login: username,
						email: THIS.state.email
					});
				}).catch(function(error)
				{
					THIS.setState({status: ft_create_error_message(error.code, error.message)});
				});
			}
			else
			{
				THIS.setState({status: ft_create_error_message("auth/wrong-username", "This usermame already exist.")});
			}
		});
	}

	render()
	{
		return (
			<div key="2">
<<<<<<< HEAD
				<div className="text_center padding_five page_center">
=======
				<div className="center padding_five page_center">
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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
										<input type="text" value={this.state.email} placeholder="Email" onChange={this.ft_change_email} onKeyPress={this.ft_catch_enter.bind(this)}/>
									</div>
									<br/>
									<div className="ui fluid input">
										<input type="password" value={this.state.passwd} placeholder="Password" onChange={this.ft_change_passwd} onKeyPress={this.ft_catch_enter.bind(this)}/>
									</div>
								</div>
							</div>
							<div className="ui bottom attached button" onClick={this.ft_create_account.bind(this)}>
								Connect
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
