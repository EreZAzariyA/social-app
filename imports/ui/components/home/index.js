import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Spin } from "antd";
import { UploadInput } from "./upload-input";
import { Stories } from "./stories";
import "./style.css";
import { Posts } from "./posts";

const Home = () => {

  const {usersAreReady,user} = useTracker(()=>{
    const subscribe = Meteor.subscribe('users.user');
    return{
      usersAreReady: subscribe.ready(),
      user: Meteor.user()
    }
  },[]);

  if(usersAreReady){
    return(
      <div className="home_main_container">
        <div className="home_inner_container">
          <div className="home_page">
            
            <div className="stories_section">
              <Stories user={user}/>
            </div>

            <div className="upload_input_section">
              <UploadInput user={user}/>
            </div>

            <div className="posts_section">
              <Posts user={user}/>
            </div>

            <div></div>

          </div>

        </div>
      </div>
      );
  }else{
    return <Spin/>
  }
};

export default Home;