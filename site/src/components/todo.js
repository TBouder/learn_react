/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/09 23:49:48 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';
import Firebase from 'firebase';

export default class todo extends React.Component
{
	constructor()
	{
		super();
		this.state = {todo: 0, todo_array: [], uniqueid: 0, value: ""};
		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_change_text = this.ft_change_text.bind(this);
		this.ft_load = this.ft_load.bind(this);

		/*Load todo from database*/
		this.ft_load();
	}

	ft_add_card(THIS, uniqueid, description)
	{
		return (
			<div className="card" key={uniqueid}>
				<div className="content">
					<div className="header">Todo number {uniqueid}</div>
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
			THIS.setState({todo: THIS.state.todo + 1, uniqueid: new_unique_id, value: ""});
		});
	}

	/*This function adds a task on the page and on the database*/
	ft_add_task()
	{
		if (this.state.value != "")
		{
			firebase.database().ref('/todo_list/' + this.state.uniqueid).set({text: this.state.value});
			this.state.todo_array.push(this.ft_add_card(this, this.state.uniqueid, this.state.value));
			this.ft_find_available(this);
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

		firebase.database().ref("todo_list").orderByKey().once("value", function (snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				let key = childSnapshot.key;
				let text = childSnapshot.val().text;
				if (new_unique_id == key)
					new_unique_id++;
				datas[key] = text;
			});
			datas.forEach(function(element, index, array)
			{
				THIS.state.todo_array.push(THIS.ft_add_card(THIS, index, element));
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
