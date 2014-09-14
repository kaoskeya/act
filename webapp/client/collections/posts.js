/*
 * Add query methods like this:
 *  Posts.findPublic = function () {
 *    return Posts.find({is_public: true});
 *  }
 */

AutoForm.hooks({
  insertPostForm: {
    before: {
        insert: function(doc, template){


          var control = $('#location')[0].selectize
          console.log(control.getValue())
          var locations = _.map(control.getValue(), function(value){
            var geo = control.options[value]
            return {
              description : geo['description'],
              formatted_address : value,
              terms : geo['terms'],
              location : geo['location']
            }
          })

          doc['timestamp'] = moment().unix()
          doc['location'] = locations
          doc['organisation_id'] = $('#organisation')[0].value
          return doc
        }
    },
    after: {
      insert: function(doc, template) {
        console.log(doc)
        Router.go('user.login');
      }
    }
  }
})