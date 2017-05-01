'use strict';
//Define Routing for app
var myApp=angular.module('myapp', ['ngRoute']);
console.log("inside route");
   myApp.config(['$routeProvider', '$locationProvider',
   function($routeProvider,$locationProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    })
    .when('/register', {
        templateUrl: 'register.html',
        controller: 'RegisterController'
      })
    .when('/forgotPassword', {
        templateUrl: 'forgotpassword.html',
        controller: 'forgotController'
      })
   .when('/home', {
         
       templateUrl: 'templates/Home.html'
       
    })
    .otherwise({
       redirectTo: '/login'
    });
//    $locationProvider.html5Mode(true); //Remove the '#' from URL.
}]);
  
  myApp.controller('DashboardController', function($scope) {
     
    $scope.message = 'This is Add new order screen';
     
});