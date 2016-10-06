/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/06 14:04:35 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

export default class index extends React.Component
{
	render()
	{
		return (
			<div>
				<div className="text_center padding_two">
					<h1>Hello, world!</h1>
				</div>

				<div className="text_center padding_two">
					<Link to = "/count">
						<button className="ui labeled icon button">
							<i className="plus icon"></i>
							Let's go to the counter page
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
