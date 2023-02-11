import React, { lazy, useState } from "react";
import { Button, Card, Divider, Dropdown, Input, Space } from "antd";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import "./style.css";
import { PostsDB } from "../../../../../api/posts/posts";
import { getFullName } from "../../../../../api/helpers";

const CommentCard = lazy(()=>import('./comment_card/index'));

const PostCard = ({post})=>{

  const [comment,setComment] = useState('');

  const {user, fullPostDetails, comments}= useTracker(()=>{
    Meteor.subscribe('posts');
    const fullPost = PostsDB.find({'posts.id': post.id},{fields:{'user_id':1}}).fetch();
    const postUploaded_id = fullPost[0]?.user_id;
    const fullUserDetails = Meteor.users.find({_id: postUploaded_id}).fetch()[0];
    return{
      user: fullUserDetails,
      fullPostDetails: fullPost,
      comments:post.comments
    }
  },[post?.comments]);

  const fullName = getFullName(user);

  const addComment = ()=>{
    const user_id = Meteor.userId();
    const mainPost_id = fullPostDetails[0]?._id;
    const thisPost_id = post.id
    Meteor.call('posts.addComment',{post_id:mainPost_id,postId:thisPost_id,commentText:comment,userId:user_id},err=>{
      if(err){
        return alert(err);
      }
      alert("Comment added");
    })
  }

  if(post){
    return(
      <Card
        className="post_card"
        title={fullName + " " + new Date(post.dateCreated).toLocaleDateString()}
        >
          <div className="post">
            <p>{post.post}</p>
          </div>

          <Divider/>
          <div className="comments_container">
            {comments.length > 0 &&
              <div className="comments">
                <Card className="comments_card_container">
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: 'flex' }}
                    >
                    {comments?.map((comment)=>
                        <CommentCard key={comment.id} comment={comment} />
                      )
                    }
                  </Space>

                  <div className="comments_counter">
                  {comments?.length > 0
                  ?
                    <>
                      <Button type="text" size="small">See all comments</Button>
                      <p>{comments.length + ' Comments'}</p>
                    </>
                  :
                    <p>No comments</p>
                  }
                  </div>
                </Card>
              </div>
            }

            <div className="add_comment">
              <Input.Group compact>
                <Input type="text"
                  style={{width: '90%'}}
                  placeholder="Write an answer"
                  onChange={(e)=>setComment(e.target.value)}
                />
                <Button style={{width:'10%',padding:'5px'}} type="primary" onClick={addComment}>Post</Button>
              </Input.Group>
            </div>
          </div>
      </Card>
    );
  }
  else if(!post && post === null){
    return(
      <Card className="post_card empty_post_card">
        <h1>No Post</h1>
      </Card>
    );
  };
};

export default PostCard;
