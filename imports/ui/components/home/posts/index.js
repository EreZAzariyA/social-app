import React from "react";
import { PostCard } from "./post-card/post-card";
import "./style.css";

export const Posts = ({user})=>{

  const posts = [];

  return(
    <div className="posts_main_container">
      <div className="posts_inner_container">
        <div className="posts">
          {!posts || posts?.length === 0 &&
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
              <PostCard post={post}/>
            )
          }
        </div>
      </div>
    </div>
  );
};