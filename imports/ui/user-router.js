import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import {Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom"
import { App } from "./components/layout/index";
import { AuthRouter } from "./components/auth";
import { Spin } from "antd";


const UserRouter = ()=>{

  const {user, usersAreReady} = useTracker(()=>{
    const isReady = Meteor.subscribe('users.all');
    
    return{
      user: Meteor.user(),
      usersAreReady: isReady.ready()
    }
  },[]);

  if(usersAreReady){
    if(user){
      return(
        <BrowserRouter>
          <Routes>
            <Route path="/home/*" element={<App/>}/>

            <Route path="*" element={<Navigate to={'/home/*'}/>}/>
          </Routes>
        </BrowserRouter>
      );
    }else if(!user|| user === undefined){
      return(
        <BrowserRouter>
          <AuthRouter/>
        </BrowserRouter>
      );
    };
  }else{
    return(
      <Spin/>
    );
  }; 
};

export default UserRouter;