/*****************************************************************************/
/* Subscribe Methods */
/*****************************************************************************/

Meteor.methods({ 
  '/app/subscribe': function (oid) {
    Subscriptions.insert({'user_id' : this.userId, oid : oid})
  }
});
