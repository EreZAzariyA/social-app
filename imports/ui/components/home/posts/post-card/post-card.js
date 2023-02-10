import React from "react";
import { Card } from "antd";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import "./style.css";

export const PostCard = ({post})=>{

//   const {user}= useTracker(()=>{
//     const userId = post.user_id;
//     return{
//       user: Meteor.users.findOne({_id:userId})
//     }
//   },[])
// console.log(post);

  if(post){
    return(
      <Card className="post_card">
        <p>{post.post}</p>
      </Card>
    );
  }else if(!post || post === null){
    return(
      <Card className="post_card empty_post_card">
        <p>No Post</p>
      </Card>
    );
  };
};