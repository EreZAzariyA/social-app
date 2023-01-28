import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/home";

export const Routing = ()=>{
  return(
    <Routes>
      <Route path="/home" element={<Home/>}/>


      <Route path="/*" element={<Navigate to={'/home'}/>}/>
    </Routes>
  );
};