/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo_form.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2017/01/16 23:45:28 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import ReactPlayer		from 'react-player';
import Todo_tags		from './Todo_tags';

export default class Todo_form extends React.Component
{
	constructor(props)
	{
		super(props);
		var THIS = this;

		this.state =
		{
			login: this.props.user.displayName,
			image: this.props.user.photoURL,
			todo: 0,
			value: "",
			tag_value: "",
			lock_bool: 0,
			video_bool: 0,
			picture_bool: 0
		};

		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_count_todo = this.ft_count_todo.bind(this);
		this.ft_change_value = this.ft_change_value.bind(this);
		this.ft_change_tag_value = this.ft_change_tag_value.bind(this);
		this.ft_change_lock_bool = this.ft_change_lock_bool.bind(this);
		this.ft_change_video_bool = this.ft_change_video_bool.bind(this);
		this.ft_change_picture_bool = this.ft_change_picture_bool.bind(this);

		this.ft_count_todo();
	}

	/**	FT_COUNT_TODO **********************************************************
	**	The ft_count_todo() function loads the database and counts the number of
	**	todo to put in this.state.todo
	***************************************************************************/
	ft_count_todo()
	{
		var THIS = this;
		firebase.database().ref("todo_list").on("value", function (snapshot)
		{
			THIS.setState({todo: snapshot.numChildren()});
		});
	}

	/**	FT_ADD_TASK ************************************************************
	**	The ft_add_task() function takes no parameters and add a task in the
	**	database, then, re-set to null all the user inputs
	***************************************************************************/
	ft_add_task()
	{
		if (this.state.value != "")
		{
			let		date = Date.now();
			let		tag = this.refs.tags.getData();
			let		login = this.props.user.displayName;
			let		image = this.state.image;
			let		is_locked = this.state.lock_bool;
			let		media = this.state.video_bool == 1 ? "video" : "text";
					media = this.state.picture_bool == 1 ? "picture" : media;

			firebase.database().ref('/todo_list/').push().set(
			{
				text: this.state.value,
				time: date,
				tag: tag,
				type: media,
				user: login,
				image: image,
				locked: is_locked
			});
			this.setState({todo: this.state.todo + 1});
			this.setState({value: "", tag_value: "", type_value: "",
				lock_bool: 0, video_bool: 0, picture_bool: 0});
		}
	}

	/**	FT_ADD_TASK_ENTER ******************************************************
	**	The ft_add_task_enter() function detects when the user press enter and
	**	launch the above function (ft_add_task)
	***************************************************************************/
	ft_add_task_enter(e)
	{
		if (e.charCode == 13 || e.keyCode == 13)
			{this.ft_add_task()};
	}

	/**	FT_CHANGE_XXX **********************************************************
	**	Theses ft_change_XXX() functions change the value of the corresponding
	**	state to get the user input
	***************************************************************************/
	ft_change_value(event)
	{
		if (event.target.value.length > 140)
			this.setState({value: event.target.value.substring(0, 140)});
		else
			this.setState({value: event.target.value});
	}

	ft_change_tag_value(event)
	{
		if (event.target.value.length > 10)
			this.setState({tag_value: event.target.value.substring(0, 10)});
		else
			this.setState({tag_value: event.target.value});
	}

	ft_change_lock_bool(event)
	{
		if (this.state.lock_bool == 0)
			this.setState({lock_bool: 1});
		else
			this.setState({lock_bool: 0});
	}

	ft_change_video_bool(event)
	{
		if (this.state.video_bool == 0)
		{
			this.setState({video_bool: 1});
			this.setState({picture_bool: 0});
		}
		else
			this.setState({video_bool: 0});
	}

	ft_change_picture_bool(event)
	{
		if (this.state.picture_bool == 0)
		{
			this.setState({picture_bool: 1});
			this.setState({video_bool: 0});
		}
		else
			this.setState({picture_bool: 0});
	}

	render()
	{
		return (
			<div className="center padding_five page_center">
				<div className="ui cards centered">
					<div className="card">
						<div className="content">
							<div className="header">You have {this.state.todo} todo to do</div>
							<div className="description">
								<div className="ui fluid input">
									<input type="text" value={this.state.value} placeholder="What do you want todododo ?" onChange={this.ft_change_value} onKeyPress={this.ft_add_task_enter.bind(this)}/>
								</div>

								<br />

								{<Todo_tags ref="tags"/>}

								<br />
								<div className="ui fluid input">
									{
										this.state.lock_bool == 1
										?
										<button className="fluid ui icon teal button" value="text" onClick={this.ft_change_lock_bool}>
											<i className="lock icon" value="text" onClick={this.ft_change_lock_bool}></i>
										</button>
										:
										<button className="fluid ui icon button" value="text" onClick={this.ft_change_lock_bool}>
											<i className="lock icon" value="text" onClick={this.ft_change_lock_bool}></i>
										</button>
									}

									{
										this.state.video_bool == 1
										?
										<button className="fluid ui icon teal button" value="video" onClick={this.ft_change_video_bool}>
											<i className="film icon" value="video" onClick={this.ft_change_video_bool}></i>
										</button>
										:
										<button className="fluid ui icon button" value="video" onClick={this.ft_change_video_bool}>
											<i className="film icon" value="video" onClick={this.ft_change_video_bool}></i>
										</button>
									}

									{
										this.state.picture_bool == 1
										?
										<button className="fluid ui icon teal button" value="video" onClick={this.ft_change_picture_bool}>
											<i className="image icon" value="video" onClick={this.ft_change_picture_bool}></i>
										</button>
										:
										<button className="fluid ui icon button" value="image" onClick={this.ft_change_picture_bool}>
											<i className="image icon" value="image" onClick={this.ft_change_picture_bool}></i>
										</button>
									}
								</div>
							</div>
						</div>
						<button className="ui bottom attached button" onClick={this.ft_add_task}>
							<i className="add icon"></i>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
