import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Badge, Button, Dropdown, Spin, Tooltip } from "antd";
import {IoIosNotificationsOutline} from "react-icons/io";
import {AiOutlineCheckCircle,AiOutlineCloseCircle} from "react-icons/ai";
import { FriendsDB } from "../../../../api/friends/friends";
import { RelationshipSteps } from "../../../../api/helpers";
import "./style.css";

const Notifications = ()=>{
  const [count,setCount] = useState('');

  const {areReady, friendRequests, sentUsers} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user.friends');
    const allFriendRequests = FriendsDB.find({friend_id:Meteor.userId(),status: RelationshipSteps.REQUESTֹ_SENT})
    return{
      areReady:subscribe.ready(),
      friendRequests:allFriendRequests.fetch(),
      sentUsers: allFriendRequests.map((friendRequest)=>{
        return Meteor.users.find({_id:friendRequest.user_id}).fetch()[0];
      })
    }
  },[]);

  useEffect(()=>{
    const count = friendRequests?.length;
    setCount(count);
  },[friendRequests]);

  const rejectRequest=(userToReject)=>{
    Meteor.call('friends.reject.request',userToReject,err=>{
      if(err){
        return console.log(err);
      }
      alert('rejected!');
    });
  }

  const acceptRequest = (userToApprove)=>{
    Meteor.call('friends.accept.request',userToApprove,err=>{
      if(err){
        return console.log(err);
      }
      alert('accepted!');
    })
  }


  const items = sentUsers.map((user)=>{
    return{
      label:
        <div className="user_label">
          <div className="name">
            {user.profile.first_name + ' ' + user.profile.last_name}
          </div>
          <div className="actions">
            <Tooltip title="Accept">
              <Button size="large" shape="circle" type="light" icon={<AiOutlineCheckCircle/>} onClick={()=>acceptRequest(user._id)}/>
            </Tooltip>
            <Tooltip title='Reject'>
              <Button size="large" danger shape="circle" icon={<AiOutlineCloseCircle/>} onClick={()=>rejectRequest(user._id)}/>
            </Tooltip>
          </div>
        </div>,
      key:user._id
    }
  });


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