/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo_tags.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
<<<<<<< HEAD
/*   Updated: 2016/12/13 12:19:59 by tbouder          ###   ########.fr       */
=======
/*   Updated: 2017/01/16 23:01:01 by tbouder          ###   ########.fr       */
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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
<<<<<<< HEAD
			tag_list: [],
=======
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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

<<<<<<< HEAD
=======
	/**	FT_LOAD_TAG_LIST *******************************************************
	**	The ft_load_tag_list() function loads all the tags from the database and
	**	save them in the tag_list_raw array (when a tag is added or removed).
	***************************************************************************/
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
	ft_load_tag_list()
	{
		var		THIS = this;

		THIS.setState({tag_list_raw: []});

		firebase.database().ref("todo_tags").on("child_added", function (snapshot)
		{
			let		tag = snapshot.val().tag;
<<<<<<< HEAD
			let		key = snapshot.key;

			THIS.state.tag_list.unshift(<option value={tag} key={key}>{tag}</option>);
=======

>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
			THIS.state.tag_list_raw.unshift(tag);
			THIS.setState({tmp: THIS.state.tmp + 1});
		});

<<<<<<< HEAD
		// firebase.database().ref("todo_tags").on("child_added", function (snapshot)
		// {
		// 	let		first = 0;
		// 	let		tag = snapshot.val().tag;
		// 	let		key = snapshot.key;
		//
		// 	if (first == 0)
		// 	{
		// 		THIS.tag_list_raw({tag_list_raw: []});
		// 		first = 1;
		// 	}
		//
		// 	THIS.state.tag_list.unshift(<option value={tag} key={key}>{tag}</option>);
		// 	THIS.state.tag_list_raw.unshift(tag);
		// 	THIS.setState({tmp: THIS.state.tmp + 1});
		// });
	}

=======
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
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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

<<<<<<< HEAD
	ft_select_user_tag(value)
	{
		this.setState({user_tag: value});
	}

	// getData()
	// {
	// 	let		tag = this.state.user_tag;
	// 	var		match = 2;
	//
	// 	this.setState({user_tag: "", tag_labels: ""});
	//
	// 	firebase.database().ref("todo_tags").on("child_added", function(snapshot)
	// 	{
	// 		let		val_key = snapshot.key;
	// 		let		val_tag = snapshot.val().tag;
	// 		let		val_count = snapshot.val().count;
	//
	// 		if (val_tag == tag)
	// 		{
	// 			match = 1;
	// 			console.log("MATCH : " + val_count);
	// 			console.log(val_tag + " vs "+ tag);
	// 			firebase.database().ref('/todo_tags/').child(val_key).update({'count': val_count + 1});
	// 		}
	// 	});
	// 	if (match == 0)
	// 		firebase.database().ref('/todo_tags/').push().set({tag: tag, 'count': 0});
	// 	return (tag);
	// }

=======
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
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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
<<<<<<< HEAD
			if (match == 0)
				firebase.database().ref('/todo_tags/').push().set({tag: tag, 'count': 0});
=======
		if (match == 0)
			firebase.database().ref('/todo_tags/').push().set({tag: tag, 'count': 0});
>>>>>>> bf05bd54967456e769e24f44b8df1bb09a4b97f6
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
