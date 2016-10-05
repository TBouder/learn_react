/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   base.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/05 17:37:36 by tbouder          ###   ########.fr       */
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
					<h2>
						<img className="ui centered image" src="/img/logo.png" />
						<Link to="/"><div className="text_center">React + Node_js server</div></Link>
					</h2>
				</header>
				<div>{this.props.children}</div>
				<footer>
					<p>
						This is a demo app to showcase universal rendering and routing with <strong>React</strong> and <strong>Express</strong>.
					</p>
				</footer>
			</div>
		);
	}
}
