import React, {useState} from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { AutoComplete, Spin } from "antd";

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const SearchInput = ()=>{
  const [options, setOptions] = useState([]);

  const {usersAreReady,users } = useTracker (()=>{
    const subscribe = Meteor.subscribe('users.all');
    const usersList = Meteor.users.find();
    return{
      usersAreReady: subscribe.ready(),
      users: usersList.fetch()
    };
  },[]);
  // console.log(users);

  const onSearch = (searchText) => {
    // const list = Meteor.users.find({profile:{'first_name':"n"}}).fetch();
    // console.log(list);
  };
  
  // setOptions(
  //   !searchText ? []
  //   :
  //   [users],
  // );
  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  if(usersAreReady){
    return(
      <div className="search_input_main_container">
        <div className="search_input_main_container">
          <AutoComplete  options={options}
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