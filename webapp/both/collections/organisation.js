Organisation = new Meteor.Collection('organisation');

Organisation.attachSchema(new SimpleSchema({
  name: { type: String, label: "Organisation Name", max: 42 },
  description: { type: String, label: "Short Description" },
  admins: { type: Array },
  "admins.$": { type: String }
}));

Organisation.ownsOrganisation = function(uid) {
	return _.filter(Organisation.find({ }).fetch(), function(val){
		return _.contains( val.admins, uid );
	});
}

/*
* Add query methods like this:
*  Organisation.findPublic = function () {
*    return Organisation.find({is_public: true});
*  }
*/
