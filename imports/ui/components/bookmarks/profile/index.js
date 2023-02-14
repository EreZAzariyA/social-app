import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Spin } from "antd";
import "./style.css";
import { Header } from "../../../layout/header/header";


const Profile = ()=>{

  const {userIsReady,user} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user');
    return{
      userIsReady: subscribe.ready(),
      user: Meteor.user()
    }
  },[]);

  if(userIsReady){
    return(
      <>
        <div className="profile_main_container">
          <div className="profile_inner_container">
            
            <div className="header">
              <Header />
            </div>
            
            <div className="profile">
      
            </div>
            <h1>Profile</h1>
          </div>
        </div>
      </>
    );
  }else return <Spin />
};

export default Profile;
