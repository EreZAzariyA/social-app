import { Meteor } from "meteor/meteor";
import { FriendsDB } from "../../imports/api/friends/friends";
import { RelationshipSteps } from "../../imports/api/helpers";


Meteor.publish('user.friends',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find({});
});

// Meteor.methods({
//   'user.friends.request'(){
//     if(this.userId) throw Meteor.Error('asd')
//     return FriendsDB.find({friend_id:this.userId,status:RelationshipSteps.REQUESTֹ_SENT}).fetch()
//   }
// })