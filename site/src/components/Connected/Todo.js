/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/12/09 10:46:40 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import ReactPlayer		from 'react-player'

export default class Todo extends React.Component
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
			todo_array: [],
			uniqueid: 0,
			value: "",
			tag_value: "",
			lock_bool: 0,
			video_bool: 0,
			tmp: 0
		};

		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_change_value = this.ft_change_value.bind(this);
		this.ft_change_tag_value = this.ft_change_tag_value.bind(this);
		this.ft_change_lock_bool = this.ft_change_lock_bool.bind(this);
		this.ft_change_video_bool = this.ft_change_video_bool.bind(this);
		this.ft_load = this.ft_load.bind(this);
		this.ft_unload = this.ft_unload.bind(this);

		this.ft_load();
		this.ft_unload();
	}

	/*************************************************************************/
	/*This function loads the database on the page and create a new card*/
	ft_load()
	{
		var THIS = this;
		firebase.database().ref("todo_list").on("child_added", function (snapshot)
		{
			let key = snapshot.key;
			let text = snapshot.val().text;
			let time = snapshot.val().time;
			let tag = snapshot.val().tag;
			let user = snapshot.val().user;
			let image = snapshot.val().image;
			let type = snapshot.val().type;
			let locked = snapshot.val().locked;
			THIS.state.todo_array.unshift(THIS.ft_add_card(THIS, key, text, time, tag, type, user, image, locked));
			THIS.setState({todo: THIS.state.todo + 1});
		});
	}
	// {/* <div className="description custom_descrip">{description}</div> */}

	ft_add_card(THIS, uniqueid, description, date, tag, type, username, image, locked)
	{
		var		done_button;
		var		new_date;

		function	timeSince(date)
		{
			var seconds = Math.floor((new Date() - date) / 1000);
			var interval;

			if ((interval = Math.floor(seconds / 31536000)) > 1)
				return (interval + " years ago");
			if ((interval = Math.floor(seconds / 2592000)) > 1)
				return (interval + " months ago");
			if ((interval = Math.floor(seconds / 86400)) > 1)
				return (interval + " days ago");
			if ((interval = Math.floor(seconds / 3600)) > 1)
				return (interval + " hours ago");
			if ((interval = Math.floor(seconds / 60)) > 1)
				return (interval + " minutes ago");
			return (Math.floor(seconds) + " seconds ago");
		}

		if ((locked && username == THIS.state.login) || !locked)
		{
			done_button =
			(
				<div className="ui bottom attached button green" onClick={THIS.ft_del_task.bind(THIS, uniqueid)}>
					<i className="checkmark icon"></i> Done
				</div>
			);
		}
		else if (locked)
		{
			done_button =
			(
				<div className="ui bottom attached button red">
					<i className="remove icon"></i> Locked
				</div>
			);
		}

		new_date = timeSince(date);

		return (
			<div className="ui card fade-in segment" key={uniqueid}>
				<div className="content">
					<div className="right floated right_data">
						<div className="meta">{new_date}</div>
						<div className="meta">{tag}</div>
					</div>
					<div className="left floated">
						<img className="ui avatar image" src={image}/> {username}
					</div>
			    </div>

				<div className="content">
					{
						type == "video"
						?
						<ReactPlayer url={description} controls width="260px" height="140px"/>
						:
						<div className="description custom_descrip">{description}</div>
					}
				</div>

				{done_button}
			</div>
		);
	}
	/*************************************************************************/

	/*************************************************************************/
	/*Unload data from firebase (so delete it), and delete the card from the
	current page*/
	ft_unload()
	{
		var THIS = this;
		firebase.database().ref("todo_list").on("child_removed", function (snapshot)
		{
			THIS.ft_del_task(snapshot.key);
		});
	}

	ft_del_task(id)
	{
		var len = this.state.todo_array.length;
		var i = 0;

		while (i < len)
		{
			if (this.state.todo_array[i] && this.state.todo_array[i].key == id)
			{
				delete this.state.todo_array[i];
				break;
			}
			i++;
		}
		firebase.database().ref("todo_list/" + id).remove();
		this.ft_find_available(this);
		this.setState({todo: this.state.todo - 1});
	}
	/*************************************************************************/

	/*************************************************************************/
	/*Launcher to get data to send to the DB and as card*/
	ft_add_task()
	{
		if (this.state.value != "")
		{
			let		date = Date.now();
			let		tag = this.state.tag_value;
			let		login = this.state.login;
			let		image = this.state.image;
			let		is_locked = this.state.lock_bool;
			let		is_video = this.state.video_bool == 1 ? "video" : "text";

			this.ft_find_available(this);
			firebase.database().ref('/todo_list/').push().set(
			{
				text: this.state.value,
				time: date,
				tag: tag,
				type: is_video,
				user: login,
				image: image,
				locked: is_locked
			});
			this.setState({todo: this.state.todo + 1});
		}
	}

	/*This function calls the ft_add_task function when enter is pressed*/
	ft_add_task_enter(e)
	{
		if (e.charCode == 13 || e.keyCode == 13)
			{this.ft_add_task()};
	}
	/*************************************************************************/

	/*************************************************************************/
	/*Some tools*/
	/*This function finds the next available place for an id in the array*/
	ft_find_available(THIS)
	{
		var new_unique_id = 0;

		firebase.database().ref("todo_list").orderByKey().once("value", function (snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				let key = childSnapshot.key;
				if (new_unique_id == key)
					new_unique_id++;
			});
			THIS.setState({uniqueid: new_unique_id, value: "", tag_value: "", type_value: "", lock_bool: 0, video_bool: 0});
		});
	}

	/*This function changes the value of the text to be save*/
	ft_change_value(event)
	{
		if (event.target.value.length > 140)
			this.setState({value: event.target.value.substring(0, 140)});
		else
			this.setState({value: event.target.value});
	}
	ft_change_tag_value(event)	{this.setState({tag_value: event.target.value}); }
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
			this.setState({video_bool: 1});
		else
			this.setState({video_bool: 0});
	}
	/*************************************************************************/

	render()
	{
		return (
			<div>
				<div className="text_center padding_five page_center">
					<div className="ui cards centered">
						<div className="card">
							<div className="content">
								<div className="header">You have {this.state.todo} todo to do</div>
								<div className="description">
									<div className="ui fluid input">
										<input type="text" value={this.state.value} placeholder="What do you want todododo ?" onChange={this.ft_change_value} onKeyPress={this.ft_add_task_enter.bind(this)}/>
									</div>

									<br />
									<div className="ui fluid input">
										<select name="tags" multiple="" className="ui fluid dropdown" value={this.state.tag_value} onChange={this.ft_change_tag_value} onKeyPress={this.ft_add_task_enter.bind(this)}>
											<option value="">Select your tag !</option>
											<option value="#Fun">Fun</option>
											<option value="#Cool">Cool</option>
											<option value="#Game">Game</option>
											<option value="#Love">Love</option>
											<option value="#Mars">Mars</option>
											<option value="#Space">Space</option>
											<option value="#URGENT">URGENT</option>
										</select>
									</div>

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

										{/* <button className="fluid ui toggle icon button" value="image" onClick={this.ft_change_type_value}>
											<i className="image icon" value="image" onClick={this.ft_change_type_value}></i>
										</button> */}
									</div>
								</div>
							</div>
							<div className="ui bottom attached button" onClick={this.ft_add_task}>
								<i className="add icon"></i>
							</div>
						</div>
					</div>
				</div>

				<div className="text_center padding_two page_center">
					<div className="ui cards centered">
						{this.state.todo_array}
					</div>
				</div>
			</div>
		);
	}
}
