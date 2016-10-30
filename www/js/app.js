// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('map', {
    url: '/',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  });

  $urlRouterProvider.otherwise("/");

})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded, to add the user position and points of interest
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

        var usermarker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
//***********************************************************
        var icons = {
         restaurant: {
           icon: 'icons/restaurant1.png'
         },
         beach: {
           icon: 'icons/beach.png'
         },
         bar: {
           icon:'icons/bar.png'
         },
         museum: {
           icon:'icons/museum.png'
         }
        };

        function addMarker(features) {
           var marker = new google.maps.Marker({
             position: features.position,
             icon: icons[features.type].icon,
             map: $scope.map
           });
         }

           var features = [
                    {
                      position: new google.maps.LatLng(13.1271672, -59.6334213),
                      type: 'restaurant'
                    },{
                      position: new google.maps.LatLng(13.1399145, -59.6370806),
                      type: 'restaurant'
                    },{
                      position: new google.maps.LatLng(13.1272037, -59.6281317),
                      type: 'restaurant'
                    },{
                      position: new google.maps.LatLng(13.1332681,-59.6326689),
                      type: 'restaurant'
                    },{
                      position: new google.maps.LatLng(13.14239,-59.6372471),
                      type: 'restaurant'
                    },{
                      position: new google.maps.LatLng(13.1569906,-59.6368692),
                      type: 'restaurant'
                    },{
                      position: new google.maps.LatLng(13.1302156, -59.634843),
                      type: 'beach'
                    },{
                      position: new google.maps.LatLng(13.1351526,-59.6361387),
                      type: 'beach'
                    },{
                      position: new google.maps.LatLng(13.1220751,-59.6309881),
                      type: 'beach'                      
                    },{
                      position: new google.maps.LatLng(13.0833986,-59.6022015),
                      type: 'museum'

                    }
                  ];

                  for (var i = 0, feature; feature = features[i]; i++) {
                        addMarker(feature);
                      }





      /*  var placesMarkers = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: {lat:13.1271672, lng: -59.6334213},
            icon: "icons/restaurant1.png"
          });*/

      });

  }, function(error){
    console.log("Could not get location");
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
