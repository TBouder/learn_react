/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo_content.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/12/28 23:48:58 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import ReactPlayer		from 'react-player'

export default class Todo_content extends React.Component
{
	constructor(props)
	{
		super(props);
		var 		THIS = this;

		this.state =
		{
			login: this.props.user.displayName,
			todo_array: [],
			tmp: 0
		};

		this.ft_del_task = this.ft_del_task.bind(this);
		this.ft_load = this.ft_load.bind(this);
		this.ft_unload = this.ft_unload.bind(this);

		this.ft_load();
		this.ft_unload();
	}

	/*************************************************************************/
	/*This function loads the database on the page and create a new card*/
	ft_load()
	{
		var 		THIS = this;
		firebase.database().ref("todo_list").on("child_added", function (snapshot)
		{
			let key = snapshot.key;
			let text = snapshot.val().text;
			let time = snapshot.val().time;
			let tag = snapshot.val().tag;
			let user = snapshot.val().user;
			let image = snapshot.val().image;
			let type = snapshot.val().type;
			let locked = snapshot.val().locked;
			THIS.state.todo_array.unshift(THIS.ft_add_card(
				THIS, key, text, time, tag, type, user, image, locked));
			THIS.setState({tmp: THIS.state.tmp + 1});
		});
	}

	ft_add_card(THIS, uniqueid, description, date, tag, type, username, image, locked)
	{
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

		function	doneButton(locked, username, uniqueid, THIS)
		{
			let		ret;

			if ((locked && username == THIS.state.login) || !locked)
			{
				ret =
				(
					<div className="ui bottom attached button green"
						onClick={THIS.ft_del_task.bind(THIS, uniqueid)}>
						<i className="checkmark icon"></i> Done
					</div>
				);
			}
			else if (locked)
			{
				ret =
				(
					<div className="ui bottom attached button red">
						<i className="remove icon"></i> Locked
					</div>
				);
			}
			return (ret);
		}

		var			new_date = timeSince(date);
		var			done_button = doneButton(locked, username, uniqueid,THIS);

		return (
			<div className="ui card fade-in segment" key={uniqueid}>
				<div className="content card_header">
					<div className="right floated right_data">
						<div className="meta">{new_date}</div>
						<div className="meta">#{tag}</div>
					</div>
					<div className="left floated">
						<img className="ui avatar image" src={image}/> {username}
					</div>
			    </div>

				<div className="content card_content">
					{
						type == "video"
						?
						<ReactPlayer url={description} controls width="260px" height="140px"/>
						:
						type == "picture"
						?
						<a href={description}><img src={description} width="260px" height="140px"/></a>
						:
						<div className="description custom_descrip">{description}</div>
					}
				</div>
				{done_button}
			</div>
		);
	}
	/*************************************************************************/

	/*************************************************************************/
	/*Unload data from firebase (so delete it), and delete the card from the
	current page*/
	ft_unload()
	{
		var THIS = this;
		firebase.database().ref("todo_list").on("child_removed", function (snapshot)
		{
			var		tag = snapshot.val().tag;
			THIS.ft_del_task(snapshot.key);
			THIS.setState({tmp: THIS.state.tmp - 1});

			firebase.database().ref("todo_tags").on("value", function(snapshot)
			{
				let		val_key = snapshot.key;
				let		val_tag = snapshot.val().tag;
				let		val_count = snapshot.val().count;

				if (val_tag == tag)
				{
					if (val_count == 1)
						firebase.database().ref('/todo_tags/').child(val_key).remove();
					else
						firebase.database().ref('/todo_tags/').child(val_key).update({'count': val_count - 1});
				}
			});

		});
	}

	ft_del_task(id)
	{
		var len = this.state.todo_array.length;
		var i = 0;

		while (i < len)
		{
			if (this.state.todo_array[i] && this.state.todo_array[i].key == id)
			{
				delete this.state.todo_array[i];
				break;
			}
			i++;
		}
		firebase.database().ref("todo_list/" + id).remove();
	}

	/*************************************************************************/

	render()
	{
		return (
			<div className="center padding_two page_center">
				<div className="ui cards centered">
					{this.state.todo_array}
				</div>
			</div>
		);
	}
}
