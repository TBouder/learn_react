/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_functions.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/01/16 23:38:10 by tbouder           #+#    #+#             */
/*   Updated: 2017/01/16 23:45:46 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function	timeSince(date)
{
	var seconds = Math.floor((new Date() - date) / 1000);
	var interval;

	if ((interval = Math.floor(seconds / 31536000)) > 1)
		return (interval + " years ago");
	if ((interval = Math.floor(seconds / 2592000)) > 1)
		return (interval + " months ago");
	if ((interval = Math.floor(seconds / 86400)) > 1)
		return (interval + " days ago");
	if ((interval = Math.floor(seconds / 3600)) > 1)
		return (interval + " hours ago");
	if ((interval = Math.floor(seconds / 60)) > 1)
		return (interval + " minutes ago");
	return (Math.floor(seconds) + " seconds ago");
}
