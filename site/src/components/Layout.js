/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Layout.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:48:14 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/04 20:49:52 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

class Layout extends React.Component
{
	render()
	{
		return (
			<div>
				<header>
					<Link to="/">
						<img src="/img/logo.png"/>
					</Link>
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

export default Layout;
