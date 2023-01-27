import React from "react";
import {Meteor} from "meteor/meteor";
import { Form, Input, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";


export const Register = ()=>{

  const navigate = useNavigate();

  const onFinish = (user)=>{
    Meteor.call('register',user,(err,res) =>{
      if(err){
        return console.log(err);
      };
      if(res){
        Meteor.loginWithPassword(user.email,user.password, err=>{
          if(err){
            return console.log(err);
          }
          navigate('/home');
        });
      };
    });
  };

  return(
    <div className="auth_form_container">
      <Form className="auth_form register_form"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="auth_form_title">
          <h2>Register</h2>
        </div>
        <Form.Item 
          label='First name'
          name={'first_name'}>
          <Input type="text" />
        </Form.Item>
        <Form.Item 
          label='Last name'
          name={'last_name'}>
          <Input type="text" />
        </Form.Item>
        <Form.Item 
          label='Email'
          name={'email'}>
          <Input type="email" />
        </Form.Item>
        <Form.Item 
          label='Password'
          name={'password'}>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24
          }}>
            <Button type="primary" htmlType="submit">
              Sing-Up
            </Button>
          </Form.Item>
      </Form>
      <div>
        <p>Already Have Account <NavLink to={'/auth/login'}>Sing-In</NavLink></p>
      </div>
    </div>
  );
};