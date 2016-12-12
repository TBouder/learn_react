/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Todo_tags.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tbouder <tbouder@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/03 22:53:03 by tbouder           #+#    #+#             */
/*   Updated: 2016/12/12 09:32:15 by tbouder          ###   ########.fr       */
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
			tag_list: [],
			tag_list_raw: [],
			tag_list_up: [],
			tag_labels: [],
			user_tag: "",
			tmp: 0
		};
		this.ft_change_user_tag = this.ft_change_user_tag.bind(this);
		this.ft_load_tag_list = this.ft_load_tag_list.bind(this);
		this.ft_select_user_tag = this.ft_select_user_tag.bind(this);
		this.ft_labels = this.ft_labels.bind(this);

		this.ft_load_tag_list();
	}

	ft_load_tag_list()
	{
		var		THIS = this;

		firebase.database().ref("todo_tags").on("child_added", function (snapshot)
		{
			let key = snapshot.key;
			let tag = snapshot.val().tag;
			THIS.state.tag_list.unshift(<option value={tag} key={key}>{tag}</option>);
			THIS.state.tag_list_raw.unshift(tag);
			THIS.setState({tmp: THIS.state.tmp + 1});
		});
	}

	ft_change_user_tag(event)
	{
		var updated_list = this.state.tag_list_raw;

		if (event.target.value !== "")
		{
			updated_list = updated_list.filter(function(item)
			{
				return item.toString().toLowerCase().search(event.target.value.toString().toLowerCase()) !== -1;
			});
			this.setState({tag_list_up: updated_list});
			this.ft_labels();
		}
		else
			this.setState({tag_list_up: "", tag_labels: ""});
		this.setState({user_tag: event.target.value});
	}

	ft_select_user_tag(value)
	{
		this.setState({user_tag: value});
	}

	ft_labels()
	{
		var		tag_labels = [];

		if (this.state.tag_list_up[0])
			tag_labels.unshift(<button className="ui teal label" key="unique_tag_1" onClick={this.ft_select_user_tag.bind(this, this.state.tag_list_up[0])}>{this.state.tag_list_up[0]}</button>);
		if (this.state.tag_list_up[1])
			tag_labels.unshift(<button className="ui teal label" key="unique_tag_2" onClick={this.ft_select_user_tag.bind(this, this.state.tag_list_up[1])}>{this.state.tag_list_up[1]}</button>);
		if (this.state.tag_list_up[2])
			tag_labels.unshift(<button className="ui teal label" key="unique_tag_3" onClick={this.ft_select_user_tag.bind(this, this.state.tag_list_up[2])}>{this.state.tag_list_up[2]}</button>);
		this.setState({tag_labels: tag_labels});
	}

	getData()
	{
		let		tag = this.state.user_tag;
		var		match = 0;

		this.setState({user_tag: "", tag_labels: ""});

		firebase.database().ref("todo_tags").on("child_added", function(snapshot)
		{
			if (snapshot.val().tag == tag)
				match = 1;
		});
			if (match == 0)
				firebase.database().ref('/todo_tags/').push().set({tag: tag});
		return (tag);
	}

	render()
	{
		return (
			<div>
				<div className="ui right labeled input teal fluid">
					<div className="ui label">#</div>
					<input type="text" placeholder="Tag" onChange={this.ft_change_user_tag} value={this.state.user_tag}/>
				</div>
				<br />
				{this.state.tag_labels}
			</div>
		);
	}
}
