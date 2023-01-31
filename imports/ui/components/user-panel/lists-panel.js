import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserListsDB } from '../../../api/user-lists/user-lists';
import { Spin } from 'antd';

const steps = {
  CREATE_LIST: 'CREATE_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
};

export const ListsPanel = ()=>{
  const [step, setStep] = useState('');
  const [list,setList] = useState();

  const {listsAreReady,lists } = useTracker(()=>{
    const subscribe = Meteor.subscribe('user.lists');
    const allLists = UserListsDB.find({type:type}).fetch().map((list)=>({...list,user_id}));
    return{
      listsAreReady:subscribe.ready(),
      lists: allLists
    }
  },[]);

  if(listsAreReady){
    return(
      <>
      </>
    );
  } else return <Spin/>

}