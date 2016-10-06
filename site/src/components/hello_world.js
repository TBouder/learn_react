/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   hello_world.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:44:40 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/05 23:08:58 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

export default class hello_world extends React.Component
{
	render()
	{
		return (
			<div className="text_center padding_two">
				<h1>Hello, world!</h1>
				<p>
					<Link to = "/"> Go back to the main page </Link>
				</p>
			</div>
		);
	}
}
