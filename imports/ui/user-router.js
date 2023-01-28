import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import {Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom"
import { AuthRouter } from "./components/auth";
import { Spin } from "antd";
import { App } from "./layout";


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
            <Route path="/*" element={<App/>}/>

            <Route path="*" element={<Navigate to={'/*'}/>}/>
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