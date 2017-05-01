myApp = angular.module('myapp');

myApp.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
  
    return input.slice(start);
  };
});

myApp.controller('PaginationCtrl', function($scope,$http) {
$http.get('Json-data/ProductJson.json').success(function(response){
    $scope.items = response.data;
    console.log(response.data);
});

$scope.orderByMe = function(x) {
        $scope.myOrderBy = x;
    };  
  $scope.itemsPerPage = 4;
  $scope.currentPage = 0;
  $scope.items = [];

$scope.removeName = function(row) {
    $scope.myData.splice($scope.myData.indexOf(row),1);
};
  for (var i=0; i<50; i++) {
    $scope.items.push({ id: i, name: "name "+ i, description: "description " + i });
  }

  $scope.range = function() {
    var rangeSize = 4;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

});