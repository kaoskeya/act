/*
 * Add query methods like this:
 *  Organisation.findPublic = function () {
 *    return Organisation.find({is_public: true});
 *  }
 */

AutoForm.hooks({
  insertOrganisationForm: {
  	before: {
  		insert: function(doc, template){
  			doc.admins = [ Meteor.userId() ]
  			return doc;
  		}
  	},
    after: {
      insert: function(doc, template) {
        Router.go('organisations');
      }
    }
  }
})