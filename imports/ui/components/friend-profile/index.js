import React, { useEffect, useState } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import {  useNavigate, useParams } from "react-router-dom";
import { Button, Spin, Tooltip } from "antd";
import { RelationshipSteps } from "../../../api/helpers";
import {FiUserPlus,FiUserX, FiUserCheck} from "react-icons/fi";
import { FriendsRequests } from "../../../api/friends-requests/friends-requests";
import { BiUserCheck, BiUserX } from "react-icons/bi";
import "./style.css";
import { FriendsDB } from "../../../api/friends/friends";

const UserProfile = ()=>{
  const params = useParams();
  const navigate = useNavigate();
  const [toConfirm,setToConfirm] = useState(false);

  const {friendProfileIsReady, friend, relationshipStatus, requests} = useTracker(()=>{
    const subscribe = Meteor.subscribe('friends-requests.user');
    const friendId = params.user_id;
    const currentUser = Meteor.users.findOne({_id:friendId});
    const allRequests = FriendsRequests.find({friend_id:Meteor.userId()}).fetch()
    const status = FriendsRequests.find(
      { user_id: Meteor.userId(), friend_id: friendId },
      { fields: { 'details': 1 } }).fetch();

      return{
        friendProfileIsReady: subscribe.ready(),
        friend:currentUser,
        relationshipStatus:status[0],
        requests: allRequests
      }
    },[params.user_id]);

  useEffect(()=>{
    if(params.user_id === Meteor.userId()){
      navigate('/profile');
    }
    requests?.map((request)=>{
      if(request.user_id === friend._id){
        setToConfirm(true);
        console.log(request);
      }else{
        setToConfirm(false);
      }
    });

  },[params.user_id,requests,friend]);

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

  const approveRequest = (userToApprove)=>{
    Meteor.call('friends.requests.approve',userToApprove,err=>{
      if(err){
        return console.log(err);
      }
      alert('accepted!');
    })
  }

  const rejectRequest = (userToReject)=>{
    Meteor.call('friends.requests.reject',userToReject,err=>{
      if(err){
        return console.log(err);
      }
      alert('rejected!');
    });
  }


  if(friendProfileIsReady){
    if(!friend) return <h1>User not found</h1>
    return(
      <>
        <h1>{friend.profile.first_name}</h1>
        {
          !relationshipStatus
          ?
            toConfirm
            ?
            <div className="to_confirm_container">
              <Tooltip title="Approve">
                <Button shape="circle" icon={<BiUserCheck/>} onClick={()=>approveRequest}/>
              </Tooltip>
              <Tooltip title="Denied">
                <Button shape="circle" danger icon={<BiUserX/>} onClick={()=>rejectRequest}/>
              </Tooltip>
            </div>
            :
            <Tooltip title="Send-Request">
              <Button shape="circle" icon={<FiUserPlus/>} onClick={sendFriendRequest}/>
            </Tooltip>
          :
            relationshipStatus.details
              &&
                <>
                  {relationshipStatus.details.status === RelationshipSteps.REQUESTֹ_SENT &&
                    <Tooltip title="Cancel-Request">
                    <Button shape="circle" danger icon={<FiUserX/>} onClick={cancelFriendRequest}/>
                  </Tooltip>
                  }
                  {relationshipStatus.details.status === RelationshipSteps.APPROVED &&
                    <Button shape="circle" icon={<FiUserCheck/>}/>
                  }
                </>
        }
      </>
    );
  }else return <Spin/>
};

export default UserProfile;