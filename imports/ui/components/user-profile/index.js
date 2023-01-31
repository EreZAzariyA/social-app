import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import { Spin } from "antd";

const UserProfile = ()=>{
  const params = useParams();

  const {userIsReady,user} = useTracker(()=>{
    const subscribe = Meteor.subscribe('users.all');
    const userId = params.user_id;
    return{
      userIsReady: subscribe.ready(),
      user: Meteor.users.findOne({_id:userId})
    }
  },[params]);

  console.log(user);

  if(userIsReady){

    return(
      <>
        {!user && 
          <h1>User not found</h1>
        }
        <h1>{user.profile.first_name}</h1>
      </>
    );
  }else return <Spin/>
};

export default UserProfile;