import React from "react";
import { Button, Card, Dropdown } from "antd";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import "./style.css";
import { PostsDB } from "../../../../../api/posts/posts";

export const PostCard = ({post})=>{

  const {user}= useTracker(()=>{
    Meteor.subscribe('posts');
    const fullPostDetails = PostsDB.find({'posts.id': post.id},{fields:{'user_id':1}}).fetch();
    const postUploaded_id = fullPostDetails[0]?.user_id;
    const fullUserDetails = Meteor.users.find({_id: postUploaded_id}).fetch()[0];
    return{
      user: fullUserDetails
    }
  },[]);

  if(post){
    return(
      <Card
        className="post_card"
        title={user.profile.first_name + " " +user.profile.last_name + " "+  new Date(post.dateCreated).toLocaleDateString()}
        >
        
        <p>{post.post}</p>
        
      </Card>
    );
  }
  else if(!post || post === null){
    return(
      <Card className="post_card empty_post_card">
        <h1>No Post</h1>
      </Card>
    );
  };
};