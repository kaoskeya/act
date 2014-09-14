
/*****************************************************************************/
/* Organisations: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Organisations.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
   'click #follow_button' : function(){
      Meteor.call('/app/subscribe', this._id, function (error, result) {
        console.log(arguments)
      });
   }
});

Template.Organisations.helpers({
  organisations: function() {
    return Organisation.find().fetch()
  },

  following : function(){
    return !_.isEmpty(Subscriptions.find({user_id : Meteor.userId(), oid : this._id}))
  }
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Organisations: Lifecycle Hooks */
/*****************************************************************************/
Template.Organisations.created = function () {
};

Template.Organisations.rendered = function () {
};

Template.Organisations.destroyed = function () {
};


