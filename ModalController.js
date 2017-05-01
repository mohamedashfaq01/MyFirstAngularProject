var myApp = angular.module('myapp', ['angularModalService','ngStorage']);
//'angularModalService'
myApp.controller('AdminController',function($scope,$localStorage,$http){
        $http.get('Json-data/ProductJson.json').success(function(response){
            $scope.msg="Welcome Admin...";
            $scope.items = response.data;
            console.log("before"+$scope.items.length);
            $scope.items.push($localStorage.newProducts);
            console.log($scope.items);
           console.log("After"+$scope.items.length);
            //console.log($scope.myData);
             $scope.$on('namePublished', function(event, args) {
          console.log(args.complexResult);
                 $localStorage.newProducts=args.complexResult;
         /* $scope.childNameContainer = args.complexResult;*/
          $scope.items.push(args.complexResult);
          var n=$scope.items.length;
          //console.log($scope.items.length);
          /*for(i=0;i<=n;i++){
            console.log($scope.items[i]);
          }*/
             });
        });
});
 
  myApp.filter('offset', function() {
  return function(input, start) {
     
      if (!angular.isArray(input)) {
            return [];
        }
    start = parseInt(start, 10);
  
    return input.slice(start);
  };
});


/*myApp.controller('CategoryDropDownController', function ($scope,$rootScope) {
 
    $scope.category = ['Books', 'Electronics', 'Fashion', 'Home and Furniture'];
    $scope.selectedItem="Select Category";
    $scope.dropboxitemselected = function (item) {
 
        $scope.selectedItem = item;
        alert($scope.selectedItem);
    };
}); */



myApp.controller('SampleController', ['$scope','$localStorage', '$http','ModalService', function($scope,$http,$localStorage,ModalService) 
{
$scope.complexResult = null;
$scope.test="Hello";
 $scope.showComplex = function() {
console.log("success");
 
    ModalService.showModal({

      templateUrl: "ModalData.html",
      controller: "ComplexController",
      inputs: {
        title: "New Product Details"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.complexResult  = "Name: " + result.name + ", price: " + result.price+ ", description: " + result.description + 
        ", Category: " + result.selectedName + ", imgfile: " + result.imgfile;
    
       //$localStorage.newProducts=$scope.complexResult;
        //console.log($localStorage.newProducts);
        $scope.$emit("namePublished", {
            "complexResult": $scope.complexResult
          });
       
      });
      
    });
      
  };
}]);

myApp.controller('ComplexController', [
  '$scope', '$element', 'title', 'close', 
  function($scope, $element, title, close) {

  $scope.name = null;
  $scope.price = null;
  $scope.title = title;
  $scope.description = null;
  $scope.imgfile=null;
  $scope.selectedName=null;
  $scope.category = ['Books', 'Electronics', 'Fashion', 'Home and Furniture'];
    $scope.selectedItem="Select Category";
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({
      name: $scope.name,
      price: $scope.price,
      description: $scope.description,
      selectedName: $scope.selectedName,
      imgfile: $scope.imageFile
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

}]);