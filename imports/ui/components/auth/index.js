import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Register } from "./register/register";
import "./style.css";


export const AuthRouter = ()=>{
  return(
    <div  className='auth_layout'>
      <div className="header">
        Welcome
      </div>
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to={'/auth/login'}/>}/>
    
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/auth/register" element={<Register/>}/>
    
          <Route path="*" element={<Navigate to={'/auth/login'}/>}/>
        </Routes>

      </div>
    </div>
  )
}