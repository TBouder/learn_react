/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo_content.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2017/01/16 23:46:02 by tbouder          ###   ########.fr       */
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
		var	THIS = this;

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

	/**	FT_LOAD ****************************************************************
	**	The ft_add_card() function loads the database on the page and/or create
	**	a new card when asked.
	**	It will call the ft_add_card() function.
	***************************************************************************/
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

	/**	FT_ADD_CARD ************************************************************
	**	The ft_add_card() function add a card on the page with all the data.
	***************************************************************************/
	ft_add_card(THIS, uniqid, descrip, date, tag, type, username, image, locked)
	{
		function	ft_done_button(locked, username, uniqid, THIS)
		{
			let		ret;

			if ((locked && username == THIS.state.login) || !locked)
			{
				ret =
				(
					<div className="ui bottom attached button green"
						onClick={THIS.ft_del_task.bind(THIS, uniqid)}>
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

		function	ft_content_type(type)
		{
			if (type == "video")
				return (<ReactPlayer url={descrip} controls width="260px" height="140px"/>);
			else if (type == "picture")
				return (<a href={descrip}><img src={descrip} width="260px" height="140px"/></a>);
			else
				return (<div className="description custom_descrip">{descrip}</div>);
		}

		return (
			<div className="ui card fade-in segment" key={uniqid}>
				<div className="content card_header">
					<div className="right floated right_data">
						<div className="meta">{timeSince(date)}</div>
						<div className="meta">{tag != "" ? "#" + tag : ""}</div>
					</div>
					<div className="left floated">
						<img className="ui avatar image" src={image}/> {username}
					</div>
			    </div>

				<div className="content card_content">
					{ft_content_type(type)}
				</div>
				{ft_done_button(locked, username, uniqid, THIS)}
			</div>
		);
	}

	/**	FT_UNLOAD **************************************************************
	**	The ft_unload() function unload a data fron the db and decrement the
	**	count value of the tag used by 1. If this value was 1, this function
	**	remove the tag from the databas.
	***************************************************************************/
	ft_unload()
	{
		var THIS = this;
		firebase.database().ref("todo_list").on("child_removed", function (snapshot)
		{
			var		tag = snapshot.val().tag;

			THIS.ft_del_task(snapshot.key);
			THIS.setState({tmp: THIS.state.tmp - 1});
			firebase.database().ref("todo_tags").once("value", function(snapshot)
			{
				snapshot.forEach(function(sub_snapshot)
				{

					if (sub_snapshot.val()['tag'] == tag)
					{
						let		val_key = sub_snapshot.key;
						let		val_tag = sub_snapshot.val().tag;
						let		val_count = sub_snapshot.val().count;

						if (val_count == 1)
							firebase.database().ref('/todo_tags/' + val_key + '/').remove();
						else
							firebase.database().ref('/todo_tags/' + val_key + '/').update({'count': val_count - 1});
					}
				})
			});

		});
	}

	/**	FT_DEL_TASK ************************************************************
	**	The ft_del_task() function removes the card (according to it's id), from
	**	the frontpage and from the todo_array array.
	**	By this action, thanks to firebase, ft_unload() is call
	***************************************************************************/
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

	/**	RENDER *****************************************************************
	**	The render() function renders it's content on the page.
	***************************************************************************/
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
