import React from "react";
import { Card } from "antd";
import "./style.css";

export const PostCard = ({post})=>{

  if(post){
    return(
      <Card className="post_card">
        <p>{post}</p>
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