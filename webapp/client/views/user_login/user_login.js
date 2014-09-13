
/*****************************************************************************/
/* UserLogin: Event Handlers and Helpersss .js*/
/*****************************************************************************/
var state = new ReactiveDict();

Template.UserLogin.events({
  'change #organisation': function(e, tmpl) {
    state.set('oid',  e.target.value);
    console.log( state.get('oid') );
  },
  'click #postUpdate': function(e, tmpl) {
    console.log(state.get('oid'));
  }
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.UserLogin.helpers({
  organisationsOwned: function() {
    return Organisation.ownsOrganisation( Meteor.userId() );
  }
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* UserLogin: Lifecycle Hooks */
/*****************************************************************************/
Template.UserLogin.created = function () {
};

Template.UserLogin.rendered = function () {
  var self = this;

  $('#location').selectize({
    plugins: ['remove_button'],
    valueField: 'description',
    labelField: 'description',
    searchField: 'description',
    create: false,
    load: function(query, callback) {
     if (!query.length)
       return callback();

     App.LocationService.find(query, function(results){
       callback(results)
     })

    },

    render : {
     item : function(item, escape){
       var label = item.terms[0]['value']
       return '<div class="item">' + escape(label) + '</div>';
     }
    },

    onItemAdd : function(value){
     var data = this.options[value]

     if(_.has(data, 'location')){
       return
     }

     App.LocationService.geocode_first(value,
       function(result) {
         var lat = result.geometry.location.lat()
         var lng = result.geometry.location.lng()

         data['location'] = {
           type : 'Point',
           coordinates : [lng, lat]
         }
       }
     );
    }

    });




};

Template.UserLogin.destroyed = function () {

};


