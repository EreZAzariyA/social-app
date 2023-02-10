import React, { useEffect, useState } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { PostCard } from "./post-card/post-card";
import "./style.css";
import { PostsDB } from "../../../../api/posts/posts";
import { FriendsDB } from "../../../../api/friends/friends";

import { Card, Spin } from "antd";

export const Posts = ({user})=>{

  const [allPosts,setAllPosts] = useState([]);

  const {postsAreReady,posts, friendsPosts, friendsPostsAreReady} = useTracker(()=>{
    const subscribe = Meteor.subscribe('posts');
    const subscribeFriends = Meteor.subscribe('user.friends');
    const userId = user._id;
    const myPosts = PostsDB.find({user_id:userId}).fetch();
    const allFriends = FriendsDB.find({user_id: userId},{fields:{'friendsList':1}}).fetch()[0]?.friendsList;
    const friendsPosts = allFriends?.map((friend)=>{
      return PostsDB.find({user_id:friend.friend_id},{fields:{'posts':1}}).fetch()[0];
    });

    const allFriendsPosts = friendsPosts ? friendsPosts[0]?.posts : undefined
    // const allFriendsPosts = friendsPosts?.map((postsList)=>{
    //   return postsList?.posts ? postsList[0]?.posts : []
    // })

    return {
      postsAreReady:subscribe.ready(),
      posts:myPosts[0]?.posts,
      friendsPostsAreReady:subscribeFriends.ready(),
      friendsPosts: allFriendsPosts
    }
  },[]);
  

  useEffect(()=>{
    if(posts && friendsPosts){
      const list = posts.concat(friendsPosts);
      setAllPosts(list);
    }
  },[friendsPosts,posts])


  if(postsAreReady){
    return(
      <div className="posts_main_container">
        <div className="posts_inner_container">
          <div className="posts">

            {allPosts
            ?
              allPosts
              ?.filter(post=>post)
              ?.sort((a,b)=>{return new Date(b.dateCreated) - new Date(a.dateCreated)})
              ?.map((post)=>
                <PostCard key={post.id} post={post}/>
              )
            :
              Array(4).fill(null).map((_, index) => {
                return <Card key={index} card={null} />;
              })
            }
          </div>
        </div>
      </div>
    );
  } else return <Spin/>
};