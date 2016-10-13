/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User_page.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/13 13:03:12 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import Firebase from 'firebase';

export default class Login_page extends React.Component
{
	constructor()
	{
		super();
		String.prototype.capitalizeFirstLetter = function() {return this.charAt(0).toUpperCase() + this.slice(1);}

		var user = firebase.auth().currentUser;
		this.state =
		{
			login: user.displayName.capitalizeFirstLetter(),
			email: user.email,
			email_verif: user.emailVerified,
			photo: user.photoUrl,
			uid: user.uid
		};
		console.log(user.emailVerified);
		console.log(user.photoUrl);
	}
// {this.state.email_verif}
// <img src="{this.state.photo}"/>
	render()
	{
		return (
			<div>
				<div className="text_center padding_five page_center">
					<div className="ui cards centered">
						<div className="ui card">
							<div className="image">
								{
									this.state.photo ?
									<img className="user_img" src={this.state.photo}/> :
									<img className="user_img" src="/img/user.svg"/>
								}
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}
