import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';



Meteor.startup(() => {
  // code to run on server at startup

Resolutions = new Mongo.Collection('resolutions');
  
});
