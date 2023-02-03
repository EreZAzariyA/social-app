import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Badge, Button, Dropdown, Spin, Tooltip } from "antd";
import {IoIosNotificationsOutline} from "react-icons/io";
import {AiOutlineCheckCircle,AiOutlineCloseCircle} from "react-icons/ai";

import "./style.css";
import { FriendsRequests } from "../../../../api/friends-requests/friends-requests";
import { RelationshipSteps, RequestsType } from "../../../../api/helpers";
import { NavLink } from "react-router-dom";

const Notifications = ()=>{
  const [count,setCount] = useState('');

  const {areReady, friendRequests,requests, sentUsers} = useTracker(()=>{
    const subscribe = Meteor.subscribe('friends-requests.user');
    const allRequests = FriendsRequests.find({friend_id:Meteor.userId()}).fetch()
    const friendsRequests = allRequests.filter((request)=>{
      return request.details.type === RequestsType.Friendship && request.details.status === RelationshipSteps.REQUESTֹ_SENT
    })
    const getSentUsers = friendsRequests.map((friendRequest)=>{
      return Meteor.users.find({_id: friendRequest.user_id}).fetch()[0]
    })
    return{
      areReady:subscribe.ready(),
      friendRequests:friendsRequests,
      requests:allRequests,
      sentUsers: getSentUsers
    }
  },[]);


  useEffect(()=>{
    const count = friendRequests?.length;
    setCount(count);
  },[friendRequests]);

  const rejectRequest=(userToReject)=>{
    Meteor.call('friends.requests.reject',userToReject,err=>{
      if(err){
        return console.log(err);
      }
      alert('rejected!');
    });
  }

  const acceptRequest = (userToApprove)=>{
    Meteor.call('friends.requests.approve',userToApprove,err=>{
      if(err){
        return console.log(err);
      }
      alert('accepted!');
    })
  }


  const items = sentUsers ? sentUsers.map((user)=>{
    return{
      label:
        <NavLink to={`/users/user/${user._id}`} className="user_label">
          <div className="name">
            {user.profile.first_name + ' ' + user.profile.last_name}
          </div>
          <div className="actions">
            <Tooltip title="Accept">
              <Button size="large" shape="circle" type="text" icon={<AiOutlineCheckCircle/>} onClick={()=>acceptRequest(user._id)}/>
            </Tooltip>
            <Tooltip title='Reject'>
              <Button size="large" danger shape="circle" type="text" icon={<AiOutlineCloseCircle/>} onClick={()=>rejectRequest(user._id)}/>
            </Tooltip>
          </div>
        </NavLink>,
      key:user._id
    }
  }):[{label:<Empty/>,key:'empty'}];


  if(areReady){
    return(
      <Badge count={count}>
        <Dropdown overlayClassName='notification_dropdown' menu={{items}} placement="bottomLeft" arrow trigger={['click','hover']}>
          <IoIosNotificationsOutline color="darkblue" size={'30px'} onClick={()=>setCount('')}/>
        </Dropdown>
      </Badge>
    );
  }else return <Spin/>
};

export default Notifications;