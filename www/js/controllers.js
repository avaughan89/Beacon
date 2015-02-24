var Beacon = angular.module('Beacon.controllers', []);

Beacon.controller('HomeCtrl', function($scope) {

});

Beacon.controller('MapController', function($scope, map, Events, $http, $q) {
  $scope.map = map;

  var image = {
    url: '../img/beaconbangsmall.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(9.1, 9)
  };
  var pulseFactor = .1;
  function colorMatcher(toMatch) {
    switch (toMatch){
      case "Sports":
      var color = "red"
      break;
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
    return color;
  }

  Events.getEvents()
  .then(function(data){
    var j = data;
    function formatDate(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    var markerMarker = function(data) {

      var color = colorMatcher(data.category);

      GMaps.geocode({
        address: data.location,
        callback: function(results, status){
          if (status == "OK") {
            var latlng = results[0].geometry.location;

            map.drawCircle({
              center: latlng,
              radius: (data.people_count * 10),
              fillColor: color
            })
            data.date_start = new Date()
            map.addMarker({
              lat: latlng.k,
              lng: latlng.D,
              details: {ppl_count: data.people_count},
              icon: image,
              title: " " + data.people_count + " Beacs are coming to this " + data.category + " event!",
              optimized: false,
              opacity: 0.6,
              infoWindow: {
                content:
                "<h5><a href='#/tab/event-detail/" + data.id + "'>"+data.title +"</a></h5><p>" + data.description + "</p><p class='time'>" + formatDate(data.date_start) + "</p>"
              }
            })
          } else {
            console.log("error", data)
          };
        }
      })
}

map.on('marker_added', function(marker) {
  var ppl_count = marker.details.ppl_count

  $('<style>@-webkit-keyframes pulsate' + ppl_count.toString() + '{from {-webkit-transform: scale(0.25);opacity: 1.0;}95% {-webkit-transform: scale(' + (ppl_count*pulseFactor).toString() + ');opacity: 0;color: red;}to {-webkit-transform: scale(0.3);opacity: 0;}}</style>').appendTo('head');

})

for (var i = 0; i < j.length; i+=1) {
  markerMarker(data[i])
    }
  })

function setPulseRadius(marker) {
  if (marker.attributes.title) {
    marker_info = marker.attributes.title.value;
    var ppl_count = marker_info.match(/\d+/i);
    var category = marker_info.match(/(\w+) event!$/i)[1]
    var color = colorMatcher(category);
    marker.style.webkitAnimation = 'pulsate' + ppl_count + ' 1.5s ease-in-out infinite';
  }
  marker.style.boxShadow = 'inset 0 0 5px ' + color + ', inset 0 0 5px ' + color + ', inset 0 0 5px ' + color + ', 0 0 5px ' + color + ', 0 0 5px ' + color + ', 0 0 5px ' + color;
}

setTimeout(function() {
  var eventElems = $('#map div.gmnoprint');
  for (var i = 0; i < eventElems.length; i++) {
    setPulseRadius(eventElems[i])
  }
}, 2500);

});

// Profile controller to match views that have been disabled.
// Beacon.controller('ProfileCtrl', function($scope) {});

Beacon.controller('CreateCtrl', function($scope,$http, Events, $q){
  $scope.clicked = false;
  $scope.update = function(event) {
    Events.createEvents(event);
    $scope.clicked = true;

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

Beacon.controller('EventDetailCtrl', function($scope, Events, $stateParams, $http, $q) {
  $scope.swiped = false;
  $scope.noSwipe = true;
  Events.getEvent($stateParams.id).then(function(data){
    $scope.event = data;


  })
  $scope.update = function(event) {
    Events.updateCount(event)
    .then(function(response){
      $scope.event.people_count = response.people_count;
      $scope.swiped = true;
      $scope.noSwipe = false;

    });
    $scope.rsvp = "Yes"
  }

  $scope.no = function(event) {
    $scope.rsvp = "Nope";
    $scope.swiped = false;
    $scope.noSwipe = false;
  }

});

Beacon.controller('TrendingCtrl', function($scope, Events, $http, $q) {
  Events.getEvents()
  .then(function(data){
    $scope.events = data;
    $scope.predicate = '-people_count';
  })
});

// Auth controller for eventual social integration
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