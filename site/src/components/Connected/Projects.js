/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Projects.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/29 00:17:48 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';

export default class Projects extends React.Component
{
	constructor()
	{
		super();
		var THIS = this;
		this.state ={ todo_array: [], tmp: 0};

		this.ft_add_card = this.ft_add_card.bind(this);
		this.ft_load = this.ft_load.bind(this);

		this.ft_load();
	}

	/*************************************************************************/
	/*This function loads the database on the page and create a new card*/
	ft_load()
	{
		var THIS = this;
		firebase.database().ref("42_projects").on("child_added", function (snapshot)
		{
			let key = snapshot.key;
			let name = snapshot.val().name;
			let grade = snapshot.val().grade;
			let language = snapshot.val().language;
			let image = snapshot.val().image;
			let bitbucket = snapshot.val().bitbucket;
			let github = snapshot.val().github;
			console.log(name);
			THIS.state.todo_array.push(THIS.ft_add_card(key, name, grade, language, image, bitbucket, github));
			THIS.setState({tmp: THIS.state.tmp + 1});
		});
	}
// "/img/Alum1.png"
	ft_add_card(id, name, grade, language, image, bitbucket, github)
	{
		return (
			<div className="ui card" key={id}>
				<div className="image">
					<img src={image}/>
				</div>
				<div className="content">{name}</div>
				{/* <div className="extra content">
					<div className="right floated meta">{grade}/100</div>
					<div className="left floated meta">{language}</div>
				</div> */}
				<div className="content">
					<span className="left floated">
						<i className="bitbucket icon"></i>
						<a href={bitbucket}>Bitbucket</a>
					</span>
					<span className="right floated">
						<a href={github}>Github</a>
						<i className="github alternate icon"></i>
					</span>
				</div>
			</div>
		);
	}

	render()
	{
		return (
			<div>
				<div className="text_center padding_five page_center">
					<div className="ui cards centered">
						{this.state.todo_array}
					</div>
				</div>
			</div>
		);
	}
}
