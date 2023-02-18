import React, { lazy, Suspense } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import {Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom"
import { Spin } from "antd";

const App = lazy(()=>import('./layout'));
const AuthRouter = lazy(()=>import('./layout/auth/index'));
const Profile = lazy(()=>import('./components/bookmarks/profile'));
const EditProfile = lazy(()=>import('./components/bookmarks/profile/edit-profile/index'));


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
          <Suspense fallback={<Spin/>}>
            <Routes>
              <Route path="/*" element={<App/>}/>
              <Route path="/profile/*" element={<Profile/>}/>
              <Route path="/edit-profile/:user_id" element={<EditProfile/>} />

              <Route path="/*" element={<Navigate to={'/*'}/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      );
    }else if(!user|| user === undefined){
      return(
        <BrowserRouter>
          <Suspense fallback={<Spin/>}>
            <AuthRouter/>
          </Suspense>
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