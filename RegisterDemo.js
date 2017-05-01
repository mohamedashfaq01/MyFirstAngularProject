(function(){
var myapp = angular.module('myapp', ['ngStorage']);
 
//creating custom directive
myapp.directive('ngCompare', function () {
 return {
 require: 'ngModel',
 link: function (scope, currentEl, attrs, ctrl) {
 var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
 compareEl = angular.element(comparefield);
 
 //current field key up
 currentEl.on('keyup', function () {
 if (compareEl.val() != "") {
 var isMatch = currentEl.val() === compareEl.val();
 ctrl.$setValidity('compare', isMatch);
 scope.$digest();
 }
 });
 
 //Element to compare field key up
 compareEl.on('keyup', function () {
 if (currentEl.val() != "") {
 var isMatch = currentEl.val() === compareEl.val();
 ctrl.$setValidity('compare', isMatch);
 scope.$digest();
 }
 });
 }
 }
});
 
myapp.controller('UserController',function($scope,$localStorage,$http){
        $http.get('Json-data/ProductJson.json').success(function(response){
            $scope.msg="Welcome User...";
            $scope.items = response.data;
            console.log($scope.items);
            $scope.quantity=1;
            $scope.total=0;
            $scope.selectedItem=0;
            $scope.addToCart=function(price)
            {
              console.log("INSIDE CART"+price);
              $scope.selectedItem++;
              $scope.total=$scope.total+price;
            };
            $scope.minusIcon=function()
            {
              if($scope.quantity>1)
              {
              $scope.quantity--;
              $scope.selectedItem--;
              }
              
              
            };
            $scope.plusIcon=function()
            {
               $scope.quantity++;
              $scope.selectedItem++;
            };
        });
});
// create angular controller
myapp.controller('mainController', function ($scope,$localStorage,$location,$window) {
 
 $scope.countryList = [
 { CountryId: 1, Name: 'India' },
 { CountryId: 2, Name: 'USA' }
 ];
 
 $scope.cityList = [];
 
 $scope.$watch('user.country', function (newVal,oldVal) {
 
 if (newVal == 1)
 $scope.cityList = [
 { CountryId: 1, CityId: 1, Name: 'Noida' },
 { CountryId: 1, CityId: 2, Name: 'Delhi' }];
 else if (newVal == 2)
 $scope.cityList = [
 { CountryId: 2, CityId: 3, Name: 'Texas' },
 { CountryId: 2, CityId: 4, Name: 'NewYork' }];
 else
 $scope.cityList = [];
 });
  $scope.testData = function () {

    if ($scope.userForm.$valid) {
      $scope.username=$localStorage.myObj.username;
      $scope.password=$localStorage.myObj.password;
      $scope.user=$scope.login.username;
      $scope.pass=$scope.login.password;
      console.log($scope.username);
      console.log($scope.user);
      if($scope.username==$scope.user && $scope.password==$scope.pass)
      {
        //$location.path('/Register.html');
        $window.location.href = 'UserDashboard.html';
        console.log("success");
      }
      else if($scope.user=="admin" && $scope.pass=="admin")
      {
        $window.location.href = 'http://127.0.0.1:31999/task/AdminDashboard.html';
      }
      else
      {
        alert("Invalid data");
      }
    }
     else {
 alert("Please correct errors!");
 }
  };
 // function to submit the form after all validation has occurred 
 $scope.submitForm = function () {
 
 // Set the 'submitted' flag to true
 $scope.submitted = true;
 
 if ($scope.userForm.$valid) {

  var myObj = {
                              name: $scope.user.name,
                              username: $scope.user.username,
                              password: $scope.user.password,
                              email: $scope.user.email,
                              contact: $scope.user.contactno,
                              country: $scope.user.country,
                              city: $scope.user.city
                      };
       
              $localStorage.myObj=myObj;
            console.log(myObj);
            console.log($localStorage.myObj);    
 }
 else {
 alert("Please correct errors!");
 }
 };
});
})();