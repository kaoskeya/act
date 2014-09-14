OrganisationsController = RouteController.extend({
  waitOn: function () {
  	return [Meteor.subscribe('organisations'), Meteor.subscribe('subscriptions')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
