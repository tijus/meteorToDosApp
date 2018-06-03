import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'

import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
	resolutions:function(){
		//console.log(Resolutions.find());
		if(Session.get('hideFinished'))
		{
			return Resolutions.find({checked: {$ne: true}});
		}
		else
		{
			return Resolutions.find();
		}
		/*console.log(Session.get('hideFinished'));	
		return Resolutions.find();*/
}

});

Template.body.events({

	'submit .new-resolution':function(event){
		var title = event.target.title.value;

		Meteor.call("addResolutions", title);
		event.target.title.value = "";
		return false;
	}, 
	'change .hide-finished':function(event){
		Session.set('hideFinished', event.target.checked);
	}
});

Template.resolution.events({

	'click .toggle-checked':function(){
		Meteor.call("updateResolutions", this._id, !this.checked);
	},
	'click .delete':function(){
		Meteor.call("deleteResolutions", this._id);
	}
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY",
});



