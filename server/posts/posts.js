import { Meteor } from "meteor/meteor";
import { PostsDB } from "../../imports/api/posts/posts";

Meteor.publish('posts',() =>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return PostsDB.find({});
});
Meteor.publish('posts.user',() =>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return PostsDB.find({user_id:Meteor.userId()});
});

Meteor.methods({
  'posts.create'({allPosts, userId}){

    PostsDB.upsert(
      { user_id: userId },
      {
        $push: {
          posts: { $each: allPosts }
        }
      },
      { upsert: true }
    );
}
});