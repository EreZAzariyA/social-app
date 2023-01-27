import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import UserRouter from '../imports/ui/user-router';

Meteor.startup(() => {
  if(Meteor.settings.public.IS_CLIENT){
    render(<UserRouter/>, document.getElementById('react-target'));
  }else{
    render(<UserRouter/>, document.getElementById('react-target'));
  }
  // if(Meteor.settings.public.IS_ADMIN){
  //   import('../imports/ui/admin-router.js').then(({AdminRouter}) => {
  //     render(<AdminRouter/>, document.getElementById('react-target'));
  //   });
  // }
});
