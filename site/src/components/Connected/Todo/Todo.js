/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/12/11 16:23:11 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import ReactPlayer		from 'react-player';
import Todo_form		from './Todo_form';
import Todo_content		from './Todo_content';

export default class Todo extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return (
			<div>
				{<Todo_form user={this.props.user}/>}
				{<Todo_content user={this.props.user}/>}
			</div>
		);
	}
}
