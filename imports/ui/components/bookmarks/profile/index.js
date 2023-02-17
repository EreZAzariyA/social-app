import React, { lazy, Suspense } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Button, Divider, Image, Menu, Spin } from "antd";
import "./style.css";
import { Header } from "../../../layout/header/header";
import { getFullName } from "../../../../api/helpers";
import { AiOutlineUser } from "react-icons/ai";
import { FriendsDB } from "../../../../api/friends/friends";
import { Link } from "react-router-dom";

const ProfileRouter = lazy(()=>import('./router'));

const Profile = ()=>{

  const {userIsReady,user, friends} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user');
    Meteor.subscribe('friends.user');
    const userFriends = FriendsDB.find({'user_id':Meteor.userId()},{fields:{'friendsList':1}}).fetch();
    return{
      userIsReady: subscribe.ready(),
      user: Meteor.user(),
      friends: userFriends[0]?.friendsList
    }
  },[]);

  const items = [
    {label:<Link to='/profile'>Posts</Link>,key:'posts'},
    {label:<Link to='/profile/about'>About</Link>,key:'about'},
    {label:<Link to='/profile/friends'>Friends</Link>,key:'friends'},
    {label:<Link to='/profile/photos'>Photos</Link>,key:'photos'},
  ]

  if(userIsReady){
    return(
      <>
        <Header />
        <div className="profile_main_container">
          <div className="profile_inner_container">

            <div className="profile">

              <div className="cover_img">
                {user.profile?.cover_img
                ?
                <Image className="cover" src={user.profile.cover_img} alt={`${getFullName(user)}_cover_img`}/>
                :
                <Image className="cover" src='https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_820/https://blog.snappa.com/wp-content/uploads/2021/01/Lifestyle-Image-Cover-Photo.jpg' alt="default_cover_img"/>
              }
              </div>

              <div className="user_details">
                <div className="profile_img">
                  {user.profile?.profile_img
                  ?
                    <Image className="profile" src={user.profile.profile_img} alt={`${getFullName(user)}_profile_img`}/>
                  :
                    <AiOutlineUser size={'50px'} />
                  }
                </div>

                <div className="details">
                  <p>{getFullName(user)}</p>
                  <p>{friends ? friends.length + ' Friends' : 'No Friends'}</p>
                </div>

                <div className="actions">
                  <Button type="primary">
                    <Link to={`/edit-profile/${user._id}`}>Edit-Profile</Link>
                  </Button>
                </div>
              </div>
              <Divider/>

              <div className="profile_menu">
                <Menu mode="horizontal" items={items}/>
              </div>
              
              <Suspense fallback={<Spin/>}>
                <ProfileRouter/>
              </Suspense>

            </div>
          </div>
        </div>
      </>
    );
  }else return <Spin />
};

export default Profile;
