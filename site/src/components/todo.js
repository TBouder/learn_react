/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/08 08:54:46 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';
import Firebase from 'firebase';

function Add_card(props)
{
	let	id = props.uniqueid;
	let	desc = props.description;
	let THIS = props.dest_this;

	let id_O = props.uniqueid + "_main";

	return (
		<div className="card" id={id_O} key={id_0}>
			<div className="content">
				<div className="header">Todo number {id}</div>
				<div className="description">{desc}</div>
			</div>
			<div className="ui bottom attached button green" onClick={THIS.ft_del_task.bind(THIS, id)} id={id}>
				<i className="checkmark icon"></i> Done
			</div>
			</div>
	);
}

export default class todo extends React.Component
{
	constructor()
	{
		super();
		this.state = {todo: 0, comps: [], uniqueid: 0, value: ""};
		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_change_text = this.ft_change_text.bind(this);
		this.ft_load = this.ft_load.bind(this);

		/*Load todo from database*/
		this.ft_load();

		/*Load nb_elem*/
		// var THIS = this;
		// firebase.database().ref("todo_list").on("value", function (snapshot)
		// {
		// 	var	nb_elem = snapshot.numChildren();
		// 	THIS.setState({todo: nb_elem, uniqueid: nb_elem});
		// });


	}

	ft_add_task()
	{
		console.log("LAUNCH ft_add_task");
		let id = this.state.uniqueid;
		let text = this.state.value;
		if (text == "")
			return;
		/*******************/
		firebase.database().ref('/todo_list/' + id).set({text: {text}});
		/******************/
		this.state.comps.push(<Add_card key={this.state.uniqueid} uniqueid={this.state.uniqueid} description={this.state.value} dest_this={this}/>);
		this.setState({todo: this.state.todo + 1, uniqueid: id + 1, value: ""});
	}

	ft_add_task_enter(e)
	{
		if (e.charCode == 13 || e.keyCode == 13)
			{this.ft_add_task()};
	}

	ft_del_task(id)
	{
		delete this.state.comps[id];
		firebase.database().ref("todo_list/" + id).remove();
		this.setState({todo: this.state.todo - 1});
	}

	ft_change_text(event)
	{
		this.setState({value: event.target.value});
	}

	ft_load()
	{
		console.log("LAUNCH FT_LOAD");
		var THIS = this;
		var datas = [];
		var database = firebase.database();
		var ref = database.ref("todo_list").orderByKey();

		//FACT IS : comme on met tout ce qui est dans DB, on met 2 fois les trucs qu'on ajoute : 1 fois sur le site + 1 fois en DB

		ref.once("value", function (snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				let key = childSnapshot.key;
				let text = childSnapshot.val().text.text;
				datas[key] = text;
			});
			datas.forEach(logArrayElements);
		});

		function logArrayElements(element, index, array)
		{
			let key = index + "_key";
			THIS.state.comps.push(<Add_card uniqueid={index} description={element} dest_this={THIS}/>);
			THIS.setState({todo: THIS.state.todo + 1, uniqueid: THIS.state.uniqueid + 1});
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
