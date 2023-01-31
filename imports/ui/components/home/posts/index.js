import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { PostCard } from "./post-card/post-card";
import "./style.css";
import { PostsDB } from "../../../../api/posts/posts";
import { Spin } from "antd";

export const Posts = ({user})=>{

  const {postsAreReady,posts} = useTracker(()=>{
    const subscribe = Meteor.subscribe('posts.user');
    const userId = user._id;
    const allPosts = PostsDB.find({user_id:userId}).fetch();
    return {
      postsAreReady:subscribe.ready(),
      posts: allPosts[0]?.posts
    }
  },[]);


  if(postsAreReady){
    return(
      <div className="posts_main_container">
        <div className="posts_inner_container">
          <div className="posts">
            {!posts &&
            <>
              <PostCard post={null}/>
              <PostCard post={null}/>
              <PostCard post={null}/>
              <PostCard post={null}/>
              <PostCard post={null}/>
              <PostCard post={null}/>
            </>
            }
  
            {posts &&
              posts.map(post=>
                <PostCard key={post.id} post={post}/>
              )
            }
          </div>
        </div>
      </div>
    );
  } else return <Spin/>
};