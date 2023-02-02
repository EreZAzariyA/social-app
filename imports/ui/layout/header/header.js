import React, { lazy, Suspense } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Dropdown, Spin } from "antd";
import { VscAccount } from "react-icons/vsc";
import { Logo,Logout } from "../../../api/helpers";
import SearchInput from "./serach-input";
import {IoIosNotificationsOutline} from "react-icons/io";

const Notifications = lazy(()=>import('./notifications/index'));
import "./style.css";


export const Header = ()=>{

  const items = [
    {
      key: 'logout',
      label: <Button onClick={Logout} type="link" danger>Logout</Button>
    }
  ];

  return(
    <div className="header_main_container">
      <div className="header_inner_container">
        <div className="left_side">
          <div className="logo">
            <Logo/>
          </div>
        </div>
        

        <div className="center">
          <div className="search_box">
            <SearchInput/>
          </div>
        </div>



        <div className="right_side">
          <div className="notifications">
            <Suspense fallback={<Spin/>}>
              <Notifications/>
            </Suspense>
          </div>

          <div className="auth">
            <Dropdown menu={{items}} placement="bottomLeft" arrow trigger={['click','hover']}>
              <VscAccount color="darkblue" size={'30px'}/>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}