import { Meteor } from "meteor/meteor";

Meteor.publish('user.friends',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return Meteor.user()?.social?.friends;
});
Meteor.publish('user.saved',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return Meteor.user()?.social?.saved;
});
Meteor.publish('user.events',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return Meteor.user()?.social?.events;
});
Meteor.publish('user.groups',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return Meteor.user()?.social?.groups;
});
