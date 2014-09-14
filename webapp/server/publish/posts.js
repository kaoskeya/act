/*****************************************************************************/
/* Posts Publish Functions
/*****************************************************************************/

Meteor.publish('posts', function () {
    var oids = Subscriptions.find({'user_id' : this.userId}).fetch()
    oids = _.pluck(oids, 'oid')
    return Posts.find({'organisation_id' : {$in : oids}});
});
