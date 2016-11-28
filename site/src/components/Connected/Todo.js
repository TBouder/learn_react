/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/28 12:10:47 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import Create_account	from '../Account/Create_account';

export default class Todo extends React.Component
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
			login: "",
			image: "",
			todo: 0,
			todo_array: [],
			uniqueid: 0,
			value: "",
			tag_value: ""
		};

		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_change_value = this.ft_change_value.bind(this);
		this.ft_change_tag_value = this.ft_change_tag_value.bind(this);
		this.ft_load = this.ft_load.bind(this);
		this.ft_unload = this.ft_unload.bind(this);

		/*Load todo from database*/
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
				THIS.setState({login: user.displayName, image: user.photoURL});
		});

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
			THIS.state.todo_array.unshift(THIS.ft_add_card(THIS, key, text, time, tag, user, image));
			THIS.setState({todo: THIS.state.todo + 1});
		});
	}

	ft_add_card(THIS, uniqueid, description, date, tag, username, image)
	{
		function timeSince(date)
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

		var new_date = timeSince(date);
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
					<div className="description">{description}</div>
				</div>

				<div className="ui bottom attached button green" onClick={THIS.ft_del_task.bind(THIS, uniqueid)}>
					<i className="checkmark icon"></i> Done
				</div>
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
			var date = Date.now();
			var tag = this.state.tag_value;
			var login = this.state.login;
			var image = this.state.image;
			this.ft_find_available(this);
			firebase.database().ref('/todo_list/').push().set(
			{
				text: this.state.value,
				time: date,
				tag: tag,
				user: login,
				image: image
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
			THIS.setState({uniqueid: new_unique_id, value: "", tag_value: ""});
		});
	}

	/*This function changes the value of the text to be save*/
	ft_change_value(event)		{ this.setState({value: event.target.value}); }
	ft_change_tag_value(event)	{this.setState({tag_value: event.target.value}); }
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
