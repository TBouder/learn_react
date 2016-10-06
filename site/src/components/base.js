/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   base.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/05 23:32:54 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

export default class base extends React.Component
{
	render()
	{
		return (
			<div>
				<header>
					<img className="ui centered image" src="/img/logo.png" />
					<Link to="/"><h2 className="text_center">React + Node_js server</h2></Link>
				</header>

				<div>{this.props.children}</div>

				<footer>
					<div className="text_center padding_ten">
						<strong>React</strong> and <strong>Express</strong> by <strong>Tbouder</strong>.
					</div>
				</footer>
			</div>
		);
	}
}
