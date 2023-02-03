import React, { useEffect, useState } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import { Button, Spin, Tooltip } from "antd";
import { RelationshipSteps } from "../../../api/helpers";
import {FiUserPlus,FiUserX, FiUserCheck} from "react-icons/fi";
import { FriendsRequests } from "../../../api/friends-requests/friends-requests";
import { BiUserCheck, BiUserX } from "react-icons/bi";
import "./style.css";

const UserProfile = ()=>{
  const params = useParams();
  const [toConfirm,setToConfirm] = useState(false);

  const {friendProfileIsReady, friend, relationshipStatus, requests} = useTracker(()=>{
    const subscribe = Meteor.subscribe('friends-requests.user');
    const friendId = params.user_id;
    const currentUser = Meteor.users.findOne({_id:friendId});
    const allRequests = FriendsRequests.find({user_id:friendId}).fetch()
    const status = FriendsRequests.find(
      { user_id: Meteor.userId(), friend_id: friendId },
      { fields: { 'details': 1 } }).fetch();
    
    return{
      friendProfileIsReady: subscribe.ready(),
      friend:currentUser,
      relationshipStatus:status[0],
      requests: allRequests
    }
  },[params]);

  useEffect(()=>{
    requests.map((request)=>{
      if(request.user_id === params.user_id){
        setToConfirm(true);
      }
    });
  },[params.user_id,requests]);

  const sendFriendRequest = () =>{
    Meteor.call('friends.requests.send', friend, err =>{
      if(err) return alert(err);
      alert('request has been sent');
    })
  };
  
  const cancelFriendRequest = ()=>{
    Meteor.call('friends.requests.cancel', friend, err =>{
      if(err) return alert(err);
      alert('request has been canceled');
    })
  }

  if(friendProfileIsReady){
    if(!friend) return <h1>User not found</h1>
    return(
      <>
        <h1>{friend.profile.first_name}</h1>
          {!relationshipStatus ?
            <>
              {toConfirm ?
                <div className="to_confirm_container">
                  <Tooltip title="Approve">
                    <Button shape="circle" icon={<BiUserCheck/>} onClick={sendFriendRequest}/>
                  </Tooltip>

                  <Tooltip title="Denied">
                    <Button shape="circle" danger icon={<BiUserX/>} onClick={sendFriendRequest}/>
                  </Tooltip>
                </div>
              :
                <Tooltip title="Send-Request">
                  <Button shape="circle" icon={<FiUserPlus/>} onClick={sendFriendRequest}/>
                </Tooltip>
              }
            </>
          :
            <>
            {relationshipStatus.details &&
                  <>
                    {relationshipStatus.details.status === RelationshipSteps.REQUESTֹ_SENT &&
                      <Tooltip title="Cancel-Request">
                      <Button shape="circle" danger icon={<FiUserX/>} onClick={cancelFriendRequest}/>
                    </Tooltip>
                    }
                    {relationshipStatus.details.status === RelationshipSteps.APPROVED &&
                      <Button shape="circle" icon={<FiUserCheck/>} onClick={sendFriendRequest}/>
                    }
                  </>
                }
            </>
          }
      </>
    );
  }else return <Spin/>
};

export default UserProfile;