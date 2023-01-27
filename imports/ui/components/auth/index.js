import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Register } from "./register/register";
import "./style.css";
import { Logo } from "../../../api/helpers";

export const AuthRouter = ()=>{
  return(
    <div  className='auth_layout'>
      <div className="header">
        <div className="logo_div">
          <Logo/>
        </div>
      </div>
      
      <div className="content" style={{height: 'auto'}}>
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