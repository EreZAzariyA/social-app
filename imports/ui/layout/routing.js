import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(()=>import('../components/home'));
const UserProfile = lazy(()=>import('../components/profile-menu/profile/index'));
const Friends = lazy(()=>import('../components/profile-menu/friends/index'));
const Saved = lazy(()=>import('../components/profile-menu/saved/index'));
const Events = lazy(()=>import('../components/profile-menu/events/index'));


export const Routing = ()=>{
  return(
    <Suspense fallback={<Spin/>}>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/profile" element={<UserProfile/>}/>
        <Route path="/home/friends" element={<Friends/>}/>
        <Route path="/home/saved" element={<Saved/>}/>
        <Route path="/home/events" element={<Events/>}/>


        <Route path="/*" element={<Navigate to={'/home'}/>}/>
      </Routes>
    </Suspense>
  );
};