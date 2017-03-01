define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

controllers.controller('queryModellerCtrl',['$scope', 'DbService', '$state', function($scope, DbService, $state){
   //document.querySelector('px-app-nav').markSelected('/querymodular');
    $scope.querytext=document.getElementById('OutputQuery').value;
    $scope.executeQuery = function(){
        alert("Execute Query");
        alert(dbString);
	alert(querytext);
        console.log(dbString);
        console.log(querytext);
    };
  console.log($scope.querytext);
}]);
});

