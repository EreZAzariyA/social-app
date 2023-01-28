import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Spin } from "antd";
import "./style.css";
import { UploadInput } from "./upload-input";

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
            <div className="header input">
              <UploadInput user={user}/>
            </div>

          </div>

        </div>
      </div>
      );
  }else{
    return <Spin/>
  }
};

export default Home;