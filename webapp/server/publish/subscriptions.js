/*****************************************************************************/
/* Subscriptions Publish Functions
/*****************************************************************************/

Meteor.publish('subscriptions', function () {
  // you can remove this if you return a cursor
  return Subscriptions.find({'user_id' : this.userId})
});
