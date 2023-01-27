import React from "react";
import { Meteor } from "meteor/meteor";
import "./style.css";
import { Button, Dropdown, Divider, Space, Menu, Input } from "antd";
import { Logo } from "../../../../api/helpers";
import { VscAccount } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
export const Header = ()=>{

  const logout = ()=>{
    Meteor.logout(err=>{
      if(err){
        alert(err);
      };
    });
  };

  const authMenuItems = [
    {
      key: 'logout',
      label: <Button type="link" danger>Logout</Button>,
      onClick:()=>logout()
    }
  ];

  const menu = [
    {
      key: 'home',
      icon: <NavLink to='/home/dashboard'><RxDashboard size={'30px'} color='darkblue'/></NavLink>
    },
    {
      key: 'notifications',
      icon: <NavLink to='/home/notifications'><IoMdNotificationsOutline size={'30px'} color='darkblue'/></NavLink>
    }
  ]


  return(
    <div className="header_main_container">
      <div className="header_container">
        <div className="logo_box">
          <Logo/>
        </div>

        <div className="search_box">
          <Input type="text" placeholder="Search"/>
        </div>


        <div className="auth_box">
          <Dropdown menu={{authMenuItems}} placement="bottomLeft" arrow>
            <VscAccount color="darkblue" size={'30px'}/>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}