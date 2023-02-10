import React, { useEffect, useState } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Random } from 'meteor/random';
import { Button, Form, Input, Menu, Modal } from "antd";
import "./style.css";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "rc-field-form";

const items = [
  {label:'Live video',key:'live'},
  {label:'Phone/video',key:'upload'},
  {label:'Feeling/activity',key:'feelings'},
];
export const UploadInput = ({user, listOfPosts,post})=>{
  const [form] = Form.useForm();

  const onFinish = (values)=>{
    values.comments = [];
    const postToSave = {
      id: post?.id ? post.id: Random.id(),
      ...values,
      dateCreated: new Date().toJSON()
    }

    Meteor.call('posts.create',{postToSave:[postToSave],userId:user._id},(err)=>{
        if(err) {
          return alert(err);
        } else {
          alert('created');
        }
      }
    );
    form.resetFields();
  };

  const placeholder = `Hey ${user.profile?.first_name}, Want to write something?`;

  return(
    <div className="upload_main_container">
      <div className="upload_inner_container">
        <div className="main">
          <Form onFinish={onFinish} form={form} name='post_upload'>
            <Form.Item name={'post'}>
              <TextArea autoSize placeholder={placeholder}/>
            </Form.Item>
            
            <Form.Item>
              <Button type="link" htmlType="submit">
                Post
              </Button>
            </Form.Item>
          </Form>
          <Menu
            mode="horizontal"
            className="actions_menu"
            items={items}
          />
        </div>
      </div>
    </div>
  );
};