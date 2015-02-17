angular.module('Beacon', [
  'ionic',
  'Beacon.controllers',
  'Beacon.services',
  'Beacon.factories'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      },
     resolve: {
      events: function($scope){
        $scope.events
     }
   }
    }
  })

  .state('tab.eventDetail', {
    url: '/event-detail/:id',
    // templateUrl: 'templates/event-detail.html',
    // controller: 'EventDetailCtrl'
    cache: false,
    views: {
      "tab-home": {
        templateUrl: 'templates/event-detail.html',
        controller: 'EventDetailCtrl'
      }
    }
  })
  // .state('tab.profile', {
  //   url: '/profile',
  //   views: {
  //     'tab-profile': {
  //       templateUrl: 'templates/tab-profile.html',
  //       controller: 'ProfileCtrl'
  //     }
  //   }
  // })

  .state('tab.create', {
      url: '/create',
      views: {
        'tab-create': {
          templateUrl: 'templates/tab-create.html',
          controller: 'CreateCtrl'
        }
      }
    })


  .state('tab.trending', {
      url: '/trending',
      views: {
        'tab-trending': {
          templateUrl: 'templates/tab-trending.html',
          controller: 'TrendingCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});


