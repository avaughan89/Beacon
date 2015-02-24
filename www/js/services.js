angular.module('Beacon.services', [])


.factory('map', function(){
  var map = new GMaps({
      el: '#map',
      lat: 37.778197,
      lng: -122.432040,
      zoom: 10
      // draggable: false
  })
  return map;
})

.factory('Events', function($http, $q, ajaxFactory){
   return {
    getEvents: function(){
      return ajaxFactory.request("http://localhost:3000/events", 'get')
    },
    createEvents: function(data){
      return ajaxFactory.request("http://localhost:3000/events", "post",  data)
    },
    getEvent: function(id){
      return ajaxFactory.request("http://localhost:3000/events/" + id, 'get')
    },
    updateCount: function(data) {
      return ajaxFactory.request("http://localhost:3000/events/" + data.id, 'put')
    }
   };
});



