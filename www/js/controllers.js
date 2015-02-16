var Beacon = angular.module('Beacon.controllers', ['ng-token-auth']);

Beacon.controller('HomeCtrl', function($scope) {

});

Beacon.controller('MapController', function($scope, map, Events, $http, $q) {
  $scope.map = map;
  Events.getEvents()
  .then(function(data){
    var i;
    var j = data;
    var markerMarker = function(data) {
        switch (data.category){
          case "Sports":
          var color = "red"
          case "Entertainment":
             var color = "blue"
             break;
             case "Social":
             var color = "green"
             break;
             case "Misc":
             var color = "yellow"
             break;
             case "Video Games":
             var color = "pink"
             break;
             case "Food":
             var color = "red"
             break;
             case "Outdoors":
             var color = "orange"
             break;
          }
        GMaps.geocode({
        address: data.location,
        callback: function(results, status){
          if (status == "OK") {
            var latlng = results[0].geometry.location;
            map.drawCircle({
              center: latlng,
              radius: (data.people_count * 5),
              fillColor: color,
              infoWindow: {
                content:
                "<h5>"+ data.title + "</h5>" + "<p>" + data.description + "</p>" + "<p>" + data.date_start + "</p>"
              }
            })
          } else {
            console.log("error", data)
          };
        }

      })
}
    for (var i = 0; i < j.length; i+=1) {
    markerMarker(data[i])
    }
  })


  GMaps.geolocate({
    success: function(position) {
      map.setCenter(position.coords.latitude, position.coords.longitude)
    },
    error: function(error) {
      alert('Geolocation failed' + error.message);
    },
    not_supported: function() {
      alert('Your browser does not support Geolocation')
    }

  })

});


// Beacon.controller('ProfileCtrl', function($scope) {});

Beacon.controller('CreateCtrl', function($scope,$http, Events, $q){
  $scope.update = function(event) {
    Events.createEvents(event);

  }

});

Beacon.controller('EventsCtrl', function($scope, Events, $q, $http) {
  // $scope.events = {};
   // Events.getEvents()
   //  .then(function(data){
   //    // console.log(data);
   //    $scope.events = data;
   //    console.log($scope.events);

   //  })

});

Beacon.controller('EventDetailCtrl', function() {
  // $scope.event = Events.get($stateParams.eventId);
});

// Beacon.controller('TrendingCtrl', function($scope) {});

// Beacon.controller('registerCtrl', function ($scope, $http, $auth) {
// //   $scope.isSignedIn = function() {
// //     console.log("Hello")
// //   };


//   //OAUTH SIGN IN
//   $scope.handleBtnClick = function() {
//     $auth.authenticate('facebook')
//     .then(function(resp) {
//       alert('something successful happened')
//     })
//     .catch(function(resp) {
//         // handle errors
//         alert('something terrible happened')
//       });
//   };

//   //OAUTH SIGN OUT
//   $scope.handleSignOutBtnClick = function() {
//       $auth.signOut()
//         .then(function(resp) {
//           // handle success response
//         })
//         .catch(function(resp) {
//           // handle error response
//         });
//     };

// });

