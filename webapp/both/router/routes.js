/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
  /*
    Example:
      this.route('home', {path: '/'});
  */
  this.route('user.login', {path: '/'});
  this.route('organisations', {path: '/organisations'});
  this.route('create.organisation', {path: '/organisations/create'});
  this.route('post', {path: '/post'});
});
