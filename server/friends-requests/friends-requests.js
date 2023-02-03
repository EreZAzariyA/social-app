import { Meteor } from "meteor/meteor";
import { FriendsRequests } from "../../imports/api/friends-requests/friends-requests";
import { checkFriendshipStatus, RelationshipSteps, RequestsType } from "../../imports/api/helpers";


Meteor.publish('friends-requests.all',(()=>{
  return FriendsRequests.find({});
}));

Meteor.publish('friends-requests.user',(()=>{
  return FriendsRequests.find({
    $or: [
      { user_id: Meteor.userId() },
      { friend_id: Meteor.userId() }
    ]
  });
}));

Meteor.methods({
  'friends.requests.send'(friendToSend){
    checkFriendshipStatus(Meteor.userId(),friendToSend._id);
    FriendsRequests.upsert(
      {
        user_id:this.userId,
        friend_id:friendToSend._id,
      },
      {
        $set:{
          details:{
            type:RequestsType.Friendship,
            status:RelationshipSteps.REQUESTֹ_SENT,
            sentDate: new Date().toJSON()
          }
        }
      }
    );
  },'friends.requests.cancel'(userToCancelReq){
    FriendsRequests.remove(
      {
        user_id:this.userId,
        friend_id:userToCancelReq._id,
      }
    );
  },
  'friends.requests.approve'(userToApprove){
    FriendsRequests.upsert(
      {
        user_id:userToApprove._id,
        friend_id:this.userId,
      },
      {
        $set:{
          'details.status':RelationshipSteps.REJECTED,
          'details.dateApproved': new Date().toJSON()
        }
      }
    );
  },
  'friends.requests.reject'(userToReject){
    FriendsRequests.update(
      {
        user_id:userToReject._id,
        friend_id:this.userId,
      },
      {
        $set:{
          'details.status':RelationshipSteps.REJECTED,
          'details.dateRejected': new Date().toJSON()
        }
      }
    );
  }
})