Posts = new Meteor.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: { type: String, label: "Organisation Name", max: 42 },
  content: { type: String, label: "Short Description" },
  timestamp: { type: String, autoValue: function() { return moment.utc().format() } },
  organisation_id: { type: String },
  coordinates: { type: String },
  radius: { type: Number },
  location_string: { type: String },
  location: { type: Object }
}));

/*
 * Add query methods like this:
 *  Posts.findPublic = function () {
 *    return Posts.find({is_public: true});
 *  }
 */
