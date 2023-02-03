import React from "react";
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export const isAdmin = (user) => {
  return user && user.admin;
};

export const Logout = ()=>{
  Meteor.logout(err=>{
    if(err){
      alert(err);
    };
  });
};

export const checkFriendshipStatus = (user_id,friend_id)=>{
  if(user_id === friend_id){
    throw new Meteor.Error('Cant send request to yourself');
  }else if(!Meteor.users.find({_id:friend_id}).fetch()){
    throw new Meteor.Error('User not found');
  }
};

export const ListType = {
  Friends: "Friends",
  Posts:"Posts",
  Saved:"Saved"
}

export const RequestsType = {
  Friendship: "Friendship",
  Game: "Game",
  LiveStreaming: "LiveStreaming"
}

export const RelationshipSteps = {
  REQUESTֹ_SENT: "REQUESTֹ_SENT",
  WAITING_FOR_RESPONSE: "WAITING_FOR_RESPONSE",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  BLOCKED: "BLOCKED"
}


export const useResize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isResponsive: false
  })

  const updateSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768,
      isResponsive: window.innerWidth < 992
    })
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize)
    updateSize()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return screenSize;
}


export const Logo =()=>{
  return(
    <div className="logo_container">
      <NavLink to={'/home'}>
        <div className="logo">
          E.A
        </div>
      </NavLink>
    </div>
  )
}
