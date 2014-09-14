
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
});

Template.Organisations.helpers({
  organisations: function() {
    return Organisation.find().fetch()
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


