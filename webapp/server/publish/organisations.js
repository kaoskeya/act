/*****************************************************************************/
/* Organisations Publish Functions
/*****************************************************************************/

Meteor.publish('organisations', function () {
  // you can remove this if you return a cursor
  return Organisation.find();
});
