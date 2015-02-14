// var Beacon = angular.module('Beacon.controllers', []);
var Beacon = angular.module('Beacon.controllers', ['ng-token-auth']);
Beacon.config(function($authProvider) {
  $authProvider.configure({
            apiUrl: 'http://localhost:3000' //your api's url
          });
});

Beacon.controller('ProfileCtrl', function($scope) {})

Beacon.controller('CreateCtrl', function($scope) {
  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);

})


Beacon.controller('TrendingCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

Beacon.controller('HomeCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});



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

Beacon.controller('MapController', function() {
    var map = new GMaps({
      el: '#map',
      lat: -12.043333,
      lng: -77.028333,
      draggable: false
})

        // $scope.map = map;

});

Beacon.controller('EventsCtrl', function($scope, Events) {
  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  }
})

Beacon.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.event = Events.get($stateParams.eventId);
})


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

