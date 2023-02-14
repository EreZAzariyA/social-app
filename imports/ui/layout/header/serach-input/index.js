import React, {useState} from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { AutoComplete, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const SearchInput = ()=>{
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const {usersAreReady,users } = useTracker (()=>{
    const subscribe = Meteor.subscribe('users.all');
    const usersList = Meteor.users.find({}).fetch();
    return{
      usersAreReady: subscribe.ready(),
      users: usersList
    };
  },[]);
  
  const onSearch = (searchText) => {
    if(!searchText||searchText === '') {
      return;
    }else{
      const list = users.filter((user) => {
        // Remove the current user
        return user._id !== Meteor.userId()
        &&
        JSON.stringify(user.profile.first_name).includes(searchText)
        ||
        JSON.stringify(user.profile.last_name).includes(searchText)
      });
      setOptions(list.map((option) => {
        return {value: option.profile.first_name +' '+ option.profile.last_name , ...option}
      }));
    }
  };
  
  const onSelect = (data,option) => {
    navigate(`/users/user/${option._id}`);
  };

  if(usersAreReady){
    return(
      <div className="search_input_main_container">
        <div className="search_input_main_container">
          <AutoComplete
            allowClear
            options={options}
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}  placeholder="Search"/>
        </div>
      </div>
    );
  } else return <Spin/>
};

export default SearchInput