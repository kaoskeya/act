/*****************************************************************************/
/* Organisations Publish Functions
/*****************************************************************************/

Meteor.publish('organisations', function () {
  // you can remove this if you return a cursor
    var oids = Subscriptions.find({'user_id' : this.userId}).fetch()
    oids = _.pluck(oids, 'oid')
    return Organisation.find({'_id' : {$in : oids}});
});


Meteor.publish('allOrganisations', function () {
  // you can remove this if you return a cursor
    return Organisation.find();
});
