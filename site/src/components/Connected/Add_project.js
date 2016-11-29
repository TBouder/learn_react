/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Add_project.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/28 23:49:08 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';

export default class Add_projects extends React.Component
{
	constructor()
	{
		super();
		var THIS = this;

		this.state =
		{
			name: "",
			grade: "",
			image: "",
			bitbucket: "",
			github: "",
			language: ""
		};

		this.ft_change_name = this.ft_change_name.bind(this);
		this.ft_change_language = this.ft_change_language.bind(this);
		this.ft_change_grade = this.ft_change_grade.bind(this);
		this.ft_change_image = this.ft_change_image.bind(this);
		this.ft_change_bitbucket = this.ft_change_bitbucket.bind(this);
		this.ft_change_github = this.ft_change_github.bind(this);
		this.ft_add_project = this.ft_add_project.bind(this);
	}

	ft_add_project()
	{
		if (this.state.name != "" && this.state.grade != "" &&
			this.state.image != "" && this.state.bitbucket != "" &&
			this.state.github != "" && this.state.language != "")
		{
			firebase.database().ref('/42_projects/').push().set(
			{
				name: this.state.name,
				grade: this.state.grade,
				image: this.state.image,
				bitbucket: this.state.bitbucket,
				github: this.state.github,
				language: this.state.language
			});
			this.setState({ name: "", grade: "", image: "", bitbucket: "", github: "", language: "" });
		}
	}

	/*This function changes the value of the text to be save*/
	ft_change_name(event)		{ this.setState({name: event.target.value}); }
	ft_change_grade(event)		{ this.setState({grade: event.target.value}); }
	ft_change_image(event)		{ this.setState({image: event.target.value}); }
	ft_change_bitbucket(event)	{ this.setState({bitbucket: event.target.value}); }
	ft_change_github(event)		{ this.setState({github: event.target.value}); }
	ft_change_language(event)	{ this.setState({language: event.target.value}); }
	/*************************************************************************/



	render()
	{
		return (
			<div>
				<div className="text_center padding_five page_center">
					<div className="ui cards centered">
						<div className="card">
							<div className="content">
								<div className="header">Add a project</div>
								<div className="description">
									<div className="ui fluid input">
										<input type="text" value={this.state.name} placeholder="Name" onChange={this.ft_change_name}/>
									</div>
									<div className="ui fluid input">
										<input type="text" value={this.state.grade} placeholder="Grade" onChange={this.ft_change_grade}/>
									</div>
									<div className="ui fluid input">
										<input type="text" value={this.state.language} placeholder="Language" onChange={this.ft_change_language}/>
									</div>
									<div className="ui fluid input">
										<input type="text" value={this.state.image} placeholder="Image" onChange={this.ft_change_image}/>
									</div>
									<div className="ui fluid input">
										<input type="text" value={this.state.bitbucket} placeholder="Bitbucket" onChange={this.ft_change_bitbucket}/>
									</div>
									<div className="ui fluid input">
										<input type="text" value={this.state.github} placeholder="Github" onChange={this.ft_change_github}/>
									</div>
								</div>
							</div>
							<div className="ui bottom attached button" onClick={this.ft_add_project.bind(this)}>
								<i className="add icon"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
