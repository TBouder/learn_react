/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User_page.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/17 11:10:11 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import Firebase from 'firebase';

export default class User_page extends React.Component
{
	constructor()
	{
		super();
		var THIS = this;
		String.prototype.capitalizeFirstLetter = function() {return this.charAt(0).toUpperCase() + this.slice(1);}

		const DB = firebase.database();
		const REF = DB.ref("/users/");
		const USER = firebase.auth().currentUser;

		this.state =
		{
			login: USER.displayName,
			email: USER.email,
			email_verif: USER.emailVerified,
			photo: USER.photoURL,
			uid: USER.uid,
			photo_display_form: 0,
			photo_url_addr: ""
		};

		firebase.database().ref("/users/").orderByChild("email").equalTo(USER.email).once("value", function (snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				var user_login = childSnapshot.val().login.capitalizeFirstLetter();
				var user_email = childSnapshot.val().email;
				THIS.setState({login: user_login, email: user_email});
			});
		});
		this.ft_open_photo_form = this.ft_open_photo_form.bind(this);
		this.ft_change_text = this.ft_change_text.bind(this);
		this.ft_select_new_photo = this.ft_select_new_photo.bind(this);
	}

	ft_change_text(event)
	{
		this.setState({photo_url_addr: event.target.value});
	}

	ft_select_new_photo(e)
	{
		if (e.charCode == 13 || e.keyCode == 13)
		{
			var user = firebase.auth().currentUser;
			user.updateProfile({photoURL: this.state.photo_url_addr});
			this.setState({photo: this.state.photo_url_addr});
		}
	}

	ft_open_photo_form()
	{
		this.setState({photo_display_form: 1});
	}

	render()
	{
		return (
			<div key="1">
				<div className="text_center padding_five page_center">
					<div className="ui cards centered">
						<div className={this.state.email_verif ? "ui green card" : "ui red card"}>
							<div className="image">
								<img className="user_img" src={this.state.photo ? this.state.photo : "/img/user.svg"}/>
							</div>
							<div className="content">
								<a className="header">{this.state.login}</a>
								<div className="meta">
									<span className="date">{this.state.email}</span>
								</div>
								<div className="description">
									{this.state.uid}
								</div>
							</div>
							<div className="extra content">
								<button className="ui button" onClick={this.ft_open_photo_form}>Change photo</button>
								<button className="ui button">Or not ?</button>

								<div className={this.state.photo_display_form == 1 ? "" : "not_display"}>
									<br/>
								</div>
								<div className={this.state.photo_display_form == 1 ? "ui fluid input" : "ui fluid input not_display"}>
									<br/>
									<input type="text" value={this.state.photo_url_addr} placeholder="Link to your photo" onChange={this.ft_change_text} onKeyPress={this.ft_select_new_photo.bind(this)}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
