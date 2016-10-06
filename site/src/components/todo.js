/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/06 19:10:11 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

export default class todo extends React.Component
{
	constructor()
	{
		super();
		this.state = {todo: 0, comps: [], buffer: 0, value: ""};
		this.ft_add_task = this.ft_add_task.bind(this);
		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_change_text = this.ft_change_text.bind(this);
	}

	ft_add_task()
	{
		let id = this.state.buffer;
		let text = this.state.value;
		if (text == "")
			return;
		this.state.comps.push(
			<div className="card" key={id} id={id}>
				<div className="content">
					<div className="header">Todo n_{id}</div>
					<div className="description">
						{this.state.value}
					</div>
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

	ft_del_task(id)
	{
		delete this.state.comps[id];
		this.setState({todo: this.state.todo - 1});
		this.setState({comps: this.state.comps});
	}

	ft_change_text(event)
	{
		this.setState({value: event.target.value});
	}

	handleKeyPress(event)
	{
	  if(event.key == 'Enter'){
	    console.log('enter press here! ')
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
								<div className="header centered">Add a todo : {this.state.todo}</div>
							</div>
							<div className="description">
								<div className="ui fluid input">
									<input type="text" value={this.state.value} placeholder="What do you want todododo ?" onChange={this.ft_change_text} />
								</div>
							</div>
							<div className="ui bottom attached button" onClick={this.ft_add_task} onKeyPress={this.handleKeyPress}>
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
