import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Image, Menu, Spin } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineUsers, HiOutlineUserGroup } from "react-icons/hi";
import { BsSave } from "react-icons/bs";
import { MdOutlineEventAvailable } from "react-icons/md";
import "./style.css";
import { getFullName } from "../../../api/helpers";

export const ProfileMenu = ()=>{

  const {user, usersAreReady} = useTracker(()=>{
    const subscribe = Meteor.subscribe('users.all');
    return{
      usersAreReady: subscribe.ready(),
      user: Meteor.user()
    };
  },[]);

  const userFullName = getFullName(user);

  const items = [
    {
      key: 'profile',
      title: 'Profile',
      label: <Link to={'home/profile'}>{userFullName}</Link>,
      icon: user.profile?.image ? <Image src={user.profile?.image} style={{width: '25px'}}/> : <AiOutlineUser size={25}/>
    },
    {
      key: 'friends',
      title: 'Friends',
      label: <Link to={'home/friends'}>Friends</Link>,
      icon: <HiOutlineUsers size={25}/>
    },
    {
      key: 'saved',
      title: 'Saved',
      label: <Link to={'home/saved'}>Saved</Link>,
      icon: <BsSave size={25}/>
    },
    {
      key: 'events',
      title: 'Events',
      label: <Link to={'home/events'}>Events</Link>,
      icon: <MdOutlineEventAvailable size={25}/>
    },
    {
      key: 'see-more',
      label: 'See-More',
      children: [
        {
          key: 'groups',
          title: 'Groups',
          label: <Link to={'groups'}>Groups</Link>,
          icon: <HiOutlineUserGroup size={25}/>
        }
      ]
    },
    {type: 'divider'},
    {
      key:'shortcuts',
      label:'Your-Shortcuts',
      children:[
        {
          key:'new',
          label: "New"
        }
      ],
      type:'group',
      icon: null
    }
  ];

  if(usersAreReady){
    return(
      <div className="profile_menu_container">
        <Menu theme="light" className="profile_menu" items={items} mode='inline'/>
      </div>
    );
  }else{
    return <Spin/>
  };
};