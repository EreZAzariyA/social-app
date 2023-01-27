import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home";

export const Routing = ()=>{
  return(
    <Routes>
      <Route path="/dashboard" element={<Home/>}/>


      <Route path="/*" element={<Navigate to={'/home/dashboard'}/>}/>
    </Routes>
  );
};