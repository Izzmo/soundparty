'use strict';

angular.module('soundparty', [
  'ngRoute',
  'soundparty.chat',
  //'myApp.view2',
  //'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/chat'});
}]);
