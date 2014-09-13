OrganisationsController = RouteController.extend({
  waitOn: function () {
  	return Meteor.subscribe('organisations');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
