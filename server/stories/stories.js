import { Meteor } from "meteor/meteor";
import { StoriesDB } from "../../imports/api/stories/stories";

Meteor.publish('stories.user',()=>{
  return StoriesDB.find({'user._id':Meteor.userId()});
});

Meteor.methods({
  // 'stories.create'(values){
  //   Stories.upsert(values);
  // }
})