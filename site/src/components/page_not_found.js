/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page_not_found.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:44:40 by tbouder           #+#    #+#             */
/*   Updated: 2016/10/04 20:49:41 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React	from 'react';
import {Link}	from 'react-router';

class page_not_found extends React.Component
{
	render()
	{
		return (
			<div>
				<h1> 404 </h1>
				<h2>Page not found!</h2>
				<p>
					<Link to = "/"> Go back to the main page </Link>
				</p>
			</div>
		);
	}
}

export default page_not_found;
