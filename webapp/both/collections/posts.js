Posts = new Meteor.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: { type: String, label: "Post Title", max: 42 },
  content: { type: String, label: "Content" },
  timestamp: { type: Number },
  organisation_id: { type: String },


  location: { type: Array },
  "location.$": { type: Object }
}));

/*
 * Add query methods like this:
 *  Posts.findPublic = function () {
 *    return Posts.find({is_public: true});
 *  }
 */
