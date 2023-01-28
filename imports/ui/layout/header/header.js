import React from "react";
import { Meteor } from "meteor/meteor";
import { Button, Dropdown, Divider, Space, Menu, Input } from "antd";
import { VscAccount } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "./style.css";
import { Logo } from "../../../api/helpers";

export const Header = ()=>{

  const logout = ()=>{
    Meteor.logout(err=>{
      if(err){
        alert(err);
      };
    });
  };

  const items = [
    {
      key: 'logout',
      label: <Button type="link" danger>Logout</Button>,
      onClick:()=>logout()
    }
  ];



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
          <Dropdown menu={{items}} placement="bottomLeft" arrow>
            <VscAccount color="darkblue" size={'30px'}/>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}