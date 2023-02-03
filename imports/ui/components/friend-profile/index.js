import React, { useEffect } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import { Button, Spin, Tooltip } from "antd";
import { FriendsDB } from "../../../api/friends/friends";
import { RelationshipSteps } from "../../../api/helpers";
import {FiUserPlus,FiUserX, FiUserCheck} from "react-icons/fi";

const UserProfile = ()=>{
  const params = useParams();

  const {friendProfileIsReady, friend, relationshipStatus} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user.friends');
    const friendId = params.user_id;
    const currentUser = Meteor.users.findOne({_id:friendId});
    return{
      friendProfileIsReady: subscribe.ready(),
      friend:currentUser,
      relationshipStatus:[]
    }
  },[params]);



  const addFriend = () =>{
    Meteor.call('friends.requests.send', friend, err =>{
      if(err) return alert(err);
      alert('request has been sent');
    })
  }

  if(friendProfileIsReady){
    if(!friend) return <h1>User not found</h1>
    return(
      <>
        <h1>{friend.profile.first_name}</h1>

          {!relationshipStatus || relationshipStatus.length === 0 &&
          <Tooltip title="Sent-Request">
            <Button shape="circle" icon={<FiUserPlus/>} onClick={addFriend}/>
          </Tooltip>
          }
          {relationshipStatus === RelationshipSteps.REQUESTֹ_SENT &&
            <Tooltip title="Cancel-Request">
            <Button shape="circle" icon={<FiUserX/>} onClick={addFriend}/>
          </Tooltip>
          }
          {relationshipStatus === RelationshipSteps.APPROVED &&
            <Button shape="circle" icon={<FiUserCheck/>} onClick={addFriend}/>
          }
      </>
    );
  }else return <Spin/>
};

export default UserProfile;