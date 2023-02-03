import { Meteor } from "meteor/meteor";
import { FriendsDB } from "../../imports/api/friends/friends";


Meteor.publish('user.friends',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find({user_id:Meteor.userId()});
});
