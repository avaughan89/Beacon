var Beacon = angular.module('Beacon.controllers', ['ng-token-auth']);

Beacon.controller('HomeCtrl', function($scope) {

});

Beacon.controller('MapController', function($scope, map, Events, $http, $q) {
  $scope.map = map;

var image = {
    url: '../img/beaconbang.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(15, 15)
  };
var pulseFactor = .1;

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
              fillColor: color
            })

            map.addMarker({
                lat: latlng.k,
                lng: latlng.D,
                details: {ppl_count: data.people_count},
                icon: image,
                title: " " + data.people_count + " Beacs are coming!",
                optimized: false,
                opacity: 0.6,
                infoWindow: {
                  content:
                  "<h5><a href='#/tab/event-detail/" + data.id + "'>"+data.title +"</a></h5><p>" + data.description + "</p><p>" + data.date_start + "</p>"
                }
              })
            console.log("hello")
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
  console.log('outside if statement')
  if (marker.attributes.title) {
    console.log('in if statement')
    var ppl_count = marker.attributes.title.value.match(/\d+/i);

    marker.style.webkitAnimation = 'pulsate' + ppl_count + ' 1.5s ease-in-out infinite';
    debugger

  }
}

setTimeout(function() {
  var eventElems = $('#map div.gmnoprint');
  for (var i = 0; i < eventElems.length; i++) {
      setPulseRadius(eventElems[i]);
    }
}, 3000);

// $('#map div.gmnoprint[title="I might be here"]:eq(-1)')

//    $('#map div.gmnoprint[title="I might be here"]:eq(-1)').css('animation', "pulsate2 1.5s ease-in-out infinite");
}, 4000);

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

Beacon.controller('EventDetailCtrl', function($scope, Events, $stateParams, $http, $q) {
  $scope.swiped = false;

  Events.getEvent($stateParams.id).then(function(data){
    $scope.event = data;


  })
  $scope.update = function(event) {
    Events.updateCount(event)
    .then(function(response){
      $scope.event.people_count = response.people_count;
      $scope.swiped = true;

    });
    $scope.rsvp = "Yes"
  }

  $scope.no = function(event) {
    $scope.rsvp = "Nope"
  }



  // $scope.event = Events.get($stateParams.eventId);
});

Beacon.controller('TrendingCtrl', function($scope, Events, $http, $q) {
  Events.getEvents()
  .then(function(data){
    $scope.events = data;
    $scope.predicate = '-people_count';
  })
});

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

