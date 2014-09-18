OrganisationsController = RouteController.extend({
  waitOn: function () {
  	return [Meteor.subscribe('allOrganisations'), Meteor.subscribe('subscriptions')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
