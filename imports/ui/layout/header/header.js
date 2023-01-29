import React from "react";
import { Meteor } from "meteor/meteor";
import { Button, Dropdown, Input } from "antd";
import { VscAccount } from "react-icons/vsc";
import { Logo } from "../../../api/helpers";
import "./style.css";
import SearchInput from "./serach-input";

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
          <SearchInput/>
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