import { Meteor } from "meteor/meteor";
import { FriendsDB } from "../../imports/api/friends/friends";
import { RelationshipSteps } from "../../imports/api/helpers";

Meteor.publish('friends',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find({});
});

Meteor.publish('friends.user',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find({user_id:Meteor.userId()});
});

Meteor.methods({
  'friends.user'(user){
    return FriendsDB.find({user_id:user._id});
  },
  'friends.sent.request'(friend){
    FriendsDB.upsert({user_id: this.userId, friend_id:friend._id},{
      $set:{
        "status": RelationshipSteps.REQUESTֹ_SENT
      }
    })
  },
  'friends.accept.request'(){
    
  },
  '.friends.reject.request'(){
    
  },
  '.friends.block.user'(){

  }
});