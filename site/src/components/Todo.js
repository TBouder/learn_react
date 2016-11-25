/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/26 00:49:45 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';
import Firebase from 'firebase';

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
			login: USER.displayName, // CAUSE UNE ERROR SI NULL
			todo: 0,
			todo_array: [],
			uniqueid: 0,
			value: ""
		};
		firebase.database().ref("/users/").orderByChild("email").equalTo(USER.email).once("value", function (snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				var user_login = childSnapshot.val().login.capitalizeFirstLetter();
				THIS.setState({login: user_login});
			});
		});

		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_change_text = this.ft_change_text.bind(this);
		this.ft_load = this.ft_load.bind(this);

		/*Load todo from database*/
		this.ft_load();
	}

	ft_add_card(THIS, uniqueid, description, date)
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
			<div className="card fade-in" key={uniqueid}>
				<div className="content">
  					<div className="right floated meta">{new_date}</div>
					<div className="description">{description}</div>
				</div>
				<div className="ui bottom attached button green" onClick={THIS.ft_del_task.bind(THIS, uniqueid)}>
					<i className="checkmark icon"></i> Done
				</div>
			</div>
		);
	}

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
			THIS.setState({uniqueid: new_unique_id, value: ""});
		});
	}

	/*This function adds a task on the page and on the database*/
	ft_add_task()
	{
		if (this.state.value != "")
		{
			var date = Date.now();
			firebase.database().ref('/todo_list/' + this.state.uniqueid).set({text: this.state.value, time: date});
			this.state.todo_array.unshift(this.ft_add_card(this, this.state.uniqueid, this.state.value, date));
			this.ft_find_available(this);
			this.setState({todo: this.state.todo + 1});
		}
	}

	/*This function calls the ft_add_task function when enter is pressed*/
	ft_add_task_enter(e)
	{
		if (e.charCode == 13 || e.keyCode == 13)
			{this.ft_add_task()};
	}

	/*This function remove a specific task*/
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

	/*This function changes the value of the text to be save*/
	ft_change_text(event)
	{
		this.setState({value: event.target.value});
	}

	/*This function loads the database on the page*/
	ft_load()
	{
		var THIS = this;
		var	new_unique_id = 0;
		var datas = [];
		var	i = 0;

		firebase.database().ref("todo_list").orderByChild("time").once("value", function (snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				let key = childSnapshot.key;
				let text = childSnapshot.val().text;
				let time = childSnapshot.val().time;
				if (new_unique_id == key)
					new_unique_id++;
				datas[i++] = [key, text, time];
			});
			datas.forEach(function(element, index, array)
			{
				THIS.state.todo_array.unshift(THIS.ft_add_card(THIS, element[0], element[1], element[2]));
				THIS.setState({todo: THIS.state.todo + 1});
			});
			THIS.setState({uniqueid: new_unique_id});
		});
	}

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
										<input type="text" value={this.state.value} placeholder="What do you want todododo ?" onChange={this.ft_change_text} onKeyPress={this.ft_add_task_enter.bind(this)}/>
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
