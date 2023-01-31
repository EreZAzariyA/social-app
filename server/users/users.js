import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Meteor.publish('users.all',()=>{
  return Meteor.users.find();
});

Meteor.publish('users.user',()=>{
  return Meteor.users.find({_id:Meteor.userId()});
});

Meteor.methods({
  'register'(user) {
    const userId = Accounts.createUser({
      email:user.email,
      password: user.password,
      profile:{
        first_name:user.first_name,
        last_name:user.last_name
      }
    });
    return userId;
  }
});

