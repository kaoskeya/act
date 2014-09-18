PostController = RouteController.extend({
  waitOn: function () {
  	return [Meteor.subscribe('allOrganisations')];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
