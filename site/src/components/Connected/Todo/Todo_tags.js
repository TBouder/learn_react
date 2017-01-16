/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo_tags.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2017/01/16 23:01:01 by tbouder          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React			from 'react';
import {Link}			from 'react-router';
import Firebase 		from 'firebase';
import ReactPlayer		from 'react-player';

export default class Todo_tags extends React.Component
{
	constructor(props)
	{
		super(props);
		var THIS = this;

		this.state =
		{
			tag_list_raw: [],
			tag_list_up: [],
			tag_labels: [],
			user_tag: "",
			tmp: 0
		};
		this.ft_change_user_tag = this.ft_change_user_tag.bind(this);
		this.ft_load_tag_list = this.ft_load_tag_list.bind(this);
		this.ft_select_user_tag = this.ft_select_user_tag.bind(this);
		this.getData = this.getData.bind(this);

		this.ft_load_tag_list();
	}

	/**	FT_LOAD_TAG_LIST *******************************************************
	**	The ft_load_tag_list() function loads all the tags from the database and
	**	save them in the tag_list_raw array (when a tag is added or removed).
	***************************************************************************/
	ft_load_tag_list()
	{
		var		THIS = this;

		THIS.setState({tag_list_raw: []});

		firebase.database().ref("todo_tags").on("child_added", function (snapshot)
		{
			let		tag = snapshot.val().tag;

			THIS.state.tag_list_raw.unshift(tag);
			THIS.setState({tmp: THIS.state.tmp + 1});
		});

		firebase.database().ref("todo_tags").on("child_removed", function (snapshot)
		{
			let		tag = snapshot.val().tag;

			var index = THIS.state.tag_list_raw.indexOf(tag);
			if (index > -1) {THIS.state.tag_list_raw.splice(index, 1);}
		});
	}

	/**	FT_CHANGE_USER_TAG *****************************************************
	**	The ft_change_user_tag() function gets the content of the tag form and,
	**	according to its content and the DB content, will suggest 1 to 3 already
	**	used tags
	***************************************************************************/
	ft_change_user_tag(event)
	{
		var		tag_labels = [];
		var 	updated_list = this.state.tag_list_raw;

		if (event.target.value !== "")
		{
			updated_list = updated_list.filter(function(item)
			{
				return item.toString().toLowerCase().search(event.target.value.toString().toLowerCase()) !== -1;
			});

			if (updated_list)
			{
				if (updated_list[0])
					tag_labels.unshift(<button className="ui teal label" key="unique_tag_1" onClick={this.ft_select_user_tag.bind(this, updated_list[0])}>{updated_list[0]}</button>);
				if (updated_list[1])
					tag_labels.unshift(<button className="ui teal label" key="unique_tag_2" onClick={this.ft_select_user_tag.bind(this, updated_list[1])}>{updated_list[1]}</button>);
				if (updated_list[2])
					tag_labels.unshift(<button className="ui teal label" key="unique_tag_3" onClick={this.ft_select_user_tag.bind(this, updated_list[2])}>{updated_list[2]}</button>);
				this.setState({tag_labels: tag_labels});
			}
			this.setState({tag_list_up: updated_list});
		}
		else
			this.setState({tag_list_up: "", tag_labels: "", });
		this.setState({user_tag: event.target.value});
	}

	/**	FT_SELECT_USER_TAG *****************************************************
	**	The ft_select_user_tag() function sets the value of the tag selected by
	**	the user (by clicking the button) as the user_tag value
	***************************************************************************/
	ft_select_user_tag(value)	{this.setState({user_tag: value});}

	/**	GETDATA ***************************************************************
	**	The getData() function returns the tag asked by the user to the mother
	**	function. If the tag already exists in the database, it will increment
	**	its count by one. If not, it will create a new tag in the DB.
	***************************************************************************/
	getData()
	{
		let		tag = this.state.user_tag;
		var		match = 0;

		this.setState({user_tag: "", tag_labels: ""});

		firebase.database().ref("todo_tags").on("child_added", function(snapshot)
		{
			let		val_key = snapshot.key;
			let		val_tag = snapshot.val().tag;
			let		val_count = snapshot.val().count;

			if (val_tag == tag)
			{
				match = 1;
				firebase.database().ref('/todo_tags/').child(val_key).update({'count': val_count + 1});
			}
		});
		if (match == 0)
			firebase.database().ref('/todo_tags/').push().set({tag: tag, 'count': 0});
		return (tag);
	}

	render()
	{
		return (
			<div>
				<div className="ui right labeled input teal fluid">
					<div className="ui teal label">#</div>
					<input type="text" placeholder="Tag" onChange={this.ft_change_user_tag} value={this.state.user_tag}/>
				</div>
				<br />
				{this.state.tag_labels}
			</div>
		);
	}
}
