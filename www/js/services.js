angular.module('Beacon.services', [])


.factory('map', function(){
  var map = new GMaps({
      el: '#map',
      lat: -12.043333,
      lng: -77.028333,
      draggable: false
  })
  return map;
})

.factory('Beacon.geocode', function(){
      GMaps.geocode({
      address: event.address,
      callback: function(results){
        var latlng = results[0].geometry.location;
        // console.log(latlng)
        // event.address = latlng
        // console.log(event.address)
      }
    })
})


.factory('Events', function($http, $q){
   // return events = ajaxFactory.request("http://localhost:3000/users/1", 'get')
   return {
    getEvents: function(){
      return $http.get("http://localhost:3000/users/1")
      .then(function(response){
        if (typeof response.data === 'object') {
          return response.data;
        } else {
          return $q.reject(response.data);
        }

      }, function(response) {

        return $q.reject(response.data);
      });
    }
   };
});


// Might use a resource here that returns a JSON array

  // Some fake testing data
  // var events = [{
  //   id: 0,
  //   name: 'Flag Football',
  //   description: 'You on your way?',
  //   picture: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  // }, {
  //   id: 1,
  //   name: 'Turn Up',
  //   description: 'Hey, it\'s me',
  //   picture: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  // }, {
  //   id: 2,
  //   name: 'Turn Down',
  //   description: 'Did you get the ice cream?',
  //   picture: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  // }, {
  //   id: 3,
  //   name: 'Smash Bros Tourny',
  //   description: 'I should buy a boat',
  //   picture: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  // }, {
  //   id: 4,
  //   name: 'League of Legends Watch Party',
  //   description: 'Look at my mukluks!',
  //   picture: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  // }];

  // return {
  //   all: function() {
  //     return events;
  //   },
  //   remove: function(event) {
  //     events.splice(events.indexOf(event), 1);
  //   },
  //   get: function(eventId) {
  //     for (var i = 0; i < events.length; i++) {
  //       if (events[i].id === parseInt(eventId)) {
  //         return events[i];
  //       }
  //     }
  //     return null;
  //   }
  // }


