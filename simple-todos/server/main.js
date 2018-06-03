import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';



Meteor.startup(() => {
  // code to run on server at startup

Resolutions = new Mongo.Collection('resolutions');
  
});


Meteor.publish("resolutions", function(){
	return Resolutions.find();
})
Meteor.methods({
	addResolutions: function(title){
		Resolutions.insert({
			title: title,
		});
	}, 
	deleteResolutions: function(id){
		Resolutions.remove(id);
	},
	updateResolutions: function(id, checked)
	{
		Resolutions.update(id, {$set:{checked:checked}});
	}
});
