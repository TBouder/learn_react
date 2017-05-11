/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Count.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/11/27 22:47:58 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

export default class Count extends React.Component
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
<<<<<<< HEAD
				<div className="text_center padding_two">
=======
				<div className="center padding_two">
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
					<button className="ui green button" onClick={this.increment_count}>++ count</button>
					<button className="ui red button" onClick={this.decrement_count}>-- count</button>
					<button className="ui yellow button" onClick={this.reset_count}>Reset count</button>
					<h1>COUNT : {this.state.count}</h1>
				</div>

<<<<<<< HEAD
				<div className="text_center padding_two">
=======
				<div className="center padding_two">
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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
