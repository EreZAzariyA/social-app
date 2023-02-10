import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Image } from "antd";
import {BiUserCircle} from "react-icons/bi";
import "./style.css";

const CommentCard = ({comment})=>{

  const {commentedUser} = useTracker(()=>{
    const user = Meteor.users.find({_id:comment.user_id}).fetch();
    return{
      commentedUser:user
    }
  },[]);

  console.log(comment);
  
  return(
    <Card type="inner" className="comment_card">
      {/* <Image src={commentedUser} sizes="20px"/> */}
      <BiUserCircle size={'20px'}/>
      <p>
        {comment.text}
      </p>
    </Card>
  );
}

export default CommentCard;
