var Beacon = angular.module('Beacon.controllers', ['ng-token-auth']);
// Auth Configuration
// Beacon.config(function($authProvider) {
//   $authProvider.configure({
//             apiUrl: 'http://localhost:3000' //your api's url
//           });
// });


Beacon.controller('HomeCtrl', function($scope) {
  // Events.getEvents();

  // $scope.events = Events.getEvents()
  // .then(function(data){
  //     $scope.events = data;
  //     return $scope.events;
  //   });
});

Beacon.controller('MapController', function($scope, map, Events, $http, $q) {
  $scope.map = map;
  Events.getEvents()
  .then(function(data){
    var j = data.length;
    for (var i = 0; i < j; i+=1) {
      (function(cntr){GMaps.geocode({
        address: data[cntr].location,
        callback: function(results, status){
          if (status == "OK") {
            var latlng = results[0].geometry.location;
            map.addMarker({
              lat: latlng.k,
              lng: latlng.D,
              infoWindow: {
                content:
                "<h5>"+ data[cntr].title + "</h5>" + "<p>" + data[cntr].description + "</p>" + "<p>" + data[cntr].date_start + "</p>"
              }
            })
          }
        }

      })})(i);
    }

  })


    GMaps.geolocate({
      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude),
        map.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          title: "You are here!",
          infoWindow: {
            content: "<p>Let's do some exploring!</p>"
          }
        })
      },
      error: function(error) {
        alert('Geolocation failed' + error.message);
      },
      not_supported: function() {
        alert('Your browser does not support Geolocation')
      }

    })








      // map.addMarker({
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude,
      //     title: "You are here!",
      //     infoWindow: {
      //           content: "<p>Let's do some exploring!</p>"
      //       });

});


// Beacon.controller('ProfileCtrl', function($scope) {});

Beacon.controller('CreateCtrl',['$scope', '$http', function($scope,$http){

}]);

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

