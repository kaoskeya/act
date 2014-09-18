
/*****************************************************************************/
/* UserLogin: Event Handlers and Helpersss .js*/
/*****************************************************************************/

state = new ReactiveDict();

Template.UserLogin.events({
  'change #organisation': function(e, tmpl) {
    tmpl.oid =  e.target.value;
  },
  'click #postUpdate': function(e, tmpl) {

  },
  'click #showNewPost': function(e, tmpl) {
    $("#showNewPost").hide();
    $("#newPost").removeClass('hide');
  },
  'change #filter': function(e, tmpl) {
    //console.log( e.target.selectize.getValue() );
    state.set('filter', e.target.selectize.getValue() );
  }
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.UserLogin.helpers({
  organisation: function() {
    return Organisation.find().fetch()
  },
  organisationsOwned: function() {
    return Organisation.ownsOrganisation( Meteor.userId() );
  },
  posts: function(){
    var filters = state.get('filter');
    if(!filters)
      return Posts.find({}, { sort: { timestamp: -1 } }).fetch()
    else {
      posts = Posts.find({ }, { sort: { timestamp: -1 } }).fetch()
      //var posts = Posts.find({ organisation_id: { $in: filters } }, { sort: { timestamp: -1 } }).fetch()
      posts = _.filter( posts, function(x) {
        var f = _.pluck( x.location, 'description' );
        f.push( x.organisation_id )
        return !_.isEmpty(_.intersection( f, filters));
      });
      return posts;
    }

  },
  organisationName: function(oid) {
    return Organisation.findOne({ _id: oid }).name;
  },
  printTime: function(ts) {
    return moment.unix(ts).format();
  },
  locations: function() {
    var locations = [];
    locations = _.uniq(_.flatten(_.map( Posts.find().fetch(), function(x){
      return _.pluck(x.location, 'description');
    })));
    //console.log(locations);
    return locations;
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
  self.state = {}

  Meteor.setTimeout(function(){

    self.locations = $('#location').selectize({
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

      $('#organisation').selectize({});



  var myLatlng = new google.maps.LatLng(20, 0);
  var mapOptions = {
    zoom: 2,
    center: myLatlng
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var image = 'images/fist_simple_marker2.png';


  var markers = [];

  Deps.autorun(function(){

    _.each(markers, function(m){
      m.setMap(null);
    })

    var filters = state.get('filter');
    if(!filters)
      var posts = Posts.find({}, { sort: { timestamp: -1 } }).fetch()
    else {
      posts = Posts.find({ }, { sort: { timestamp: -1 } }).fetch()
      //var posts = Posts.find({ organisation_id: { $in: filters } }, { sort: { timestamp: -1 } }).fetch()
      posts = _.filter( posts, function(x) {
        var f = _.pluck( x.location, 'description' );
        f.push( x.organisation_id )
        return !_.isEmpty(_.intersection( f, filters));
      });
    }


  _.each(posts, function(post){
    _.each(post.location, function(loc){
      var locLatLng = new google.maps.LatLng(loc.location.coordinates[1], loc.location.coordinates[0]);
      var infowindow = new google.maps.InfoWindow({
          content: getContentString(post.title, post.content)
      });

      var marker = new google.maps.Marker({
          position: locLatLng,
          map: map,
          icon: image,
          title: post.title
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

    });
  });

});

  function getContentString(title, desc) {
    return '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">' + title + '</h1>'+
      '<div id="bodyContent">'+
      '<p>' + desc + '</p>'+
      '</div>'+
      '</div>';
  }


  console.log('initialized');



$('#filter').selectize({
  sortField: 'text',
  plugins: ['remove_button'],
});


  }, 50)






};

Template.UserLogin.destroyed = function () {
  $('.selectize-control').remove()

};


