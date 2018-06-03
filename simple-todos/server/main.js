import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';



Meteor.startup(() => {
  // code to run on server at startup

Resolutions = new Mongo.Collection('resolutions');
  
});


Meteor.publish("resolutions", function(){
	return Resolutions.find({
		$or: [
			{ private: {$ne: true} },
			{ owner: this.userId},
		]
		});
});
Meteor.methods({
	addResolutions: function(title){
		Resolutions.insert({
			title: title,
			createdAt: new Date(),
			owner: Meteor.userId()
		});
	}, 
	deleteResolutions: function(id){
		var res = Resolutions.findOne(id);
		if(res.owner !== Meteor.userId())
		{
			throw new Meteor.Error("not-authorized");
		}
		Resolutions.remove(id);
	},
	updateResolutions: function(id, checked)
	{
		var res = Resolutions.findOne(id);
		if(res.owner !== Meteor.userId())
		{
			throw new Meteor.Error("not-authorized");
		}
		Resolutions.update(id, {$set:{checked:checked}});
	}, 
	setPrivate: function(id, private)
	{
		var res = Resolutions.findOne(id);
		if(res.owner !== Meteor.userId())
		{
			throw new Meteor.Error("not-authorized");
		}
		Resolutions.update(id, {$set:{private:private}});
	},
});
