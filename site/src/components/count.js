/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   count.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/06 14:04:39 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

export default class count extends React.Component
{
	constructor()
	{
		super();
		this.state = {count: 0};
		this.increment_count = this.increment_count.bind(this);
		this.decrement_count = this.decrement_count.bind(this);
		this.reset_count = this.reset_count.bind(this);
	}

	increment_count()	{this.setState({count: this.state.count + 1});}
	decrement_count()	{this.setState({count: this.state.count - 1});}
	reset_count()		{this.setState({count: 0});}

	render()
	{
		return (
			<div>
				<div className="text_center padding_two">
					<button className="ui green button" onClick={this.increment_count}>++ count</button>
					<button className="ui red button" onClick={this.decrement_count}>-- count</button>
					<button className="ui yellow button" onClick={this.reset_count}>Reset count</button>
					<h1>COUNT : {this.state.count}</h1>
				</div>

				<div className="text_center padding_two">
					<Link to = "/">
						<button className="ui labeled icon button">
							<i className="hand spock icon"></i>
							Let's go to the Home page
						</button>
					</Link>
					<Link to = "/NOTRANDOMLOL">
						<button className="ui labeled icon button">
							<i className="remove icon"></i>
							Let's go to an error 404 page
						</button>
					</Link>
				</div>

			</div>
		);
	}
}
