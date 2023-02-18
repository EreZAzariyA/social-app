import React from "react";
import { Meteor } from "meteor/meteor";
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";

export const Login = ()=>{

  const onFinish = (values)=>{
    Meteor.loginWithPassword(values.email, values.password,(err,res)=>{
      if(err){
        return alert(err);
      }
    });
  };

  return(
    <div className="auth_form_container">
      <Form className="auth_form login_form"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="auth_form_title">
          <h2>Login</h2>
        </div>
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
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <Form.Item
        wrapperCol={{
          span: 24
        }}
        >
          <p>Forget Password? <NavLink to={'/auth/login'}>Reset Password</NavLink></p>
        </Form.Item>

      </Form>
      <div className="action">
        <p>D`ont Have Account <NavLink to={'/auth/register'}>Sing-Up</NavLink></p>
      </div>
    </div>
  );
};