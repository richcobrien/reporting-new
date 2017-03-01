define(['angular', './sample-module'], function (angular, controllers) {
  'use strict';
  controllers.controller('demoC', ['$scope','$state','$http',function($scope,$state,$http) {

/*$http.get('predix/Sukhada/ReportingToolUI/Reporting_Tool_Abhishek_Commit1/public/views/demoD.json')
       .then(function(res){
	  alert("inside ToDo");
          $scope.todos = res.data;  
	  console.log($scope.todos);              
        });*/

$http.get('../../../views/demoD.json').success(function(data) {
   $scope.todos = data; 
$scope.todos1=$scope.todos;
//alert($scope.todos1);


$scope.demof=function(){alert("Hi")};


});


}]);
});
