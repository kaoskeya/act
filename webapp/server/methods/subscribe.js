/*****************************************************************************/
/* Subscribe Methods */
/*****************************************************************************/

Meteor.methods({ 
  '/app/subscribe': function (oid) {
    var rec = Subscriptions.findOne({
        user_id : this.userId,
        oid : oid
    })

    if(!_.isEmpty(rec)){

        Subscriptions.remove({'user_id' : this.userId, oid : oid})

    }
    else{
        Subscriptions.insert({'user_id' : this.userId, oid : oid})
    }


  }
});
