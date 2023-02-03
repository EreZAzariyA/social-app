import React from "react";
import {Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Spin } from "antd";

const Friends = ()=>{
  
  const {friendsAreReady,friends} = useTracker(()=>{
    const subscribe = Meteor.subscribe('friends.user');
    const friendsList = []
    return{
      friendsAreReady: subscribe.ready(),
      friends: friendsList
    }
  },[]);

  console.log(friends);


  if(friendsAreReady){
    return(
      <>
        <h1>Friends</h1>
        {friends === undefined || !friends || friends?.length === 0 &&
        <>
          <p>No Friends</p>
          <p>Add some to see them here</p>
        
        </>
        }
      </>
    );
  }
  else return <Spin/>
};

export default Friends;
