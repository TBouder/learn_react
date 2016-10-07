/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/07 22:47:15 by tbouder          ###   ########.fr       */
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
		this.state = {todo: 0, comps: [], buffer: 0, value: ""};
		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_change_text = this.ft_change_text.bind(this);
		this.ft_load = this.ft_load.bind(this);

		/*Load todo from database*/
		this.ft_load();

		var THIS = this;
		var database = firebase.database().ref("todo_list");

		database.on("value", function (snapshot)
		{
			var	nb_elem = snapshot.numChildren();
			THIS.setState({todo: nb_elem, buffer: nb_elem});
		});

	}

	ft_add_task()
	{
		let id = this.state.buffer;
		let text = this.state.value;
		if (text == "")
			return;
		/*******************/
		var database = firebase.database();
		firebase.database().ref('/todo_list/' + id).set(
		{
			text: {text}
		});
		/******************/
		this.state.comps.push(
			<div className="card" key={id} id={id}>
				<div className="content">
					<div className="header">Todo number {id}</div>
					<div className="description">{this.state.value}</div>
				</div>
					<div className="ui bottom attached button green" onClick={this.ft_del_task.bind(this, id)} id={id}>
						<i className="checkmark icon"></i>
						Done
					</div>
			</div>
		);
		this.setState({todo: this.state.todo + 1, buffer: id + 1});
		this.setState({value: ""});
	}

	ft_add_task_enter(e)
	{
		if (e.charCode == 13 || e.keyCode == 13)
			{this.ft_add_task()};
	}

	ft_del_task(id)
	{
		delete this.state.comps[id];

		var database = firebase.database();
		var ref = database.ref("todo_list/" + id);
		ref.remove();
		this.setState({todo: this.state.todo - 1});
	}

	ft_change_text(event)
	{
		this.setState({value: event.target.value});
	}

	ft_load()
	{
		var THIS = this;
		var datas = [];
		var database = firebase.database();
		var ref = database.ref("todo_list").orderByKey();

		ref.on("value", function (snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				let key = childSnapshot.key;
				let text = childSnapshot.val().text.text;
				datas[key] = text;
			});
			datas.forEach(logArrayElements, THIS);
		});

		function logArrayElements(element, index, array)
		{
			let id = index;
			let text = element;
			THIS.state.comps.push(
				<div className="card" key={id} id={id}>
					<div className="content">
						<div className="header">Todo number {id}</div>
						<div className="description">{text}</div>
					</div>
						<div className="ui bottom attached button green" onClick={THIS.ft_del_task.bind(THIS, id)} id={id}>
							<i className="checkmark icon"></i>
							Done
						</div>
				</div>
			);
			// this.setState({todo: THIS.state.todo + 1, buffer: THIS.state.buffer + 1});
		}
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
						{this.state.comps}
					</div>
				</div>
			</div>
		);
	}
}
