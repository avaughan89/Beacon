// var Beacon = angular.module('Beacon.controllers', []);
var Beacon = angular.module('Beacon.controllers', ['ng-token-auth']);
// Auth Configuration
Beacon.config(function($authProvider) {
  $authProvider.configure({
            apiUrl: 'http://localhost:3000' //your api's url
          });
});


Beacon.controller('HomeCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

Beacon.controller('MapController', function($scope, map) {
    $scope.map = map;
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
});


Beacon.controller('ProfileCtrl', function($scope) {});

Beacon.controller('CreateCtrl',['$scope', '$http', function($scope,$http){}]);

Beacon.controller('EventsCtrl', function($scope, Events) {
  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  }
});

Beacon.controller('EventDetailCtrl', function() {
  // $scope.event = Events.get($stateParams.eventId);
});


Beacon.controller('TrendingCtrl', function($scope) {});

Beacon.controller('registerCtrl', function ($scope, $http, $auth) {


  //OAUTH SIGN IN
  $scope.handleBtnClick = function() {
    $auth.authenticate('facebook')
    .then(function(resp) {
      alert('something successful happened')
    })
    .catch(function(resp) {
        // handle errors
        alert('something terrible happened')
      });
  };

  //OAUTH SIGN OUT
  $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };

});





// Nested Friend view
// .controller('FriendsCtrl', function($scope, Friends) {
//   $scope.friends = Friends.all();
// })

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })
//
//Nested Chat view
// .controller('ChatsCtrl', function($scope, Chats) {
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   }
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

