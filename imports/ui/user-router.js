import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import {Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom"
import { App } from "./components";
import { Login } from "./components/auth/login/login";
import { Register } from "./components/auth/register/register";
import { AuthRouter } from "./components/auth";
import { Spin } from "antd";


const UserRouter = ()=>{

  const {user, usersAreReady} = useTracker(()=>{
    return{
      user: Meteor.user(),
      usersAreReady: Meteor.subscribe('users.all').ready()
    }
  },[]);

  if(usersAreReady){
    if(user){
      return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to='/home'/>}/>
            <Route path="/home" element={<App/>}/>
            <Route path="*" element={<Navigate to={'/home'}/>}/>
          </Routes>
        </BrowserRouter>
      );
    }else{
      return(
        <BrowserRouter>
          <AuthRouter/>
        </BrowserRouter>
      )
    }
  }else{
    return(
      <Spin/>
    )
  }

};

export default UserRouter;