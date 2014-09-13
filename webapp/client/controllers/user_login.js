UserLoginController = RouteController.extend({
  waitOn: function () {
  	return [ Meteor.subscribe('organisations'), Meteor.subscribe('posts') ];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
