define(['angular', './sample-module'], function (angular, controllers) {
  'use strict';
  controllers.controller('chartgenerationctrl', ['$scope', 'DbService' , '$state',function($scope, DbService,$state) {
    

    	$scope.charttitle = "";
    	$scope.chartdata = "";
    	$scope.chartdrilldata = "";


	$scope.parameters={};

	$scope.viewTableService = function(){
                alert("Viewtable ng service called");
 	   	console.log("inside table function");
 	   	DbService.viewTable()
 	   	.then(function(tables){
	     console.log("Success");
                  $scope.records=tables;
                console.log($scope.Tables);
                var i=0;

$scope.result=[];
$scope.header=[];
angular.forEach($scope.records, function(value, key) {
  angular.forEach(value, function(value1, key) {
    angular.forEach(value1, function(value2, key) {
      $scope.result.push(value2);
      var count = Object.keys(value2).length;
      while(i<count){
        angular.forEach(value2, function(value3, key) {
          $scope.header.push(key);
          i++;
        });
      }
    });
  });
});
		}, 
		function(error){
		console.log("Failure");
		});
		};        

	$scope.getParameters = function(){
	DbService.chartColumnDataFunction()
	.then(function(response){
		for (var key in response) {
    			if (response.hasOwnProperty(key)) {
        			console.log(key + " = " + response[key]);
    			}
		} 
		
		$scope.parameters = response[key];
	}, function(error){
		console.log("Failure");
	});
	};
     
    var index=0;
var x=10;
$("#ok_button").click(function () {	
	var xaxis = $("#sel1").val();
   var yaxis = $("#sel2").val();
	var drilldown = $("#sel4").val();
	var chartType = $("#sel3").val();
   DbService.getChartData(xaxis, yaxis, drilldown, chartType)
   .then(function(chartData){
		$scope.chartdata = JSON.stringify(chartData.mainJSON);
      $scope.chartdrilldata = JSON.stringify(chartData.drillDownModel);
      alert($scope.chartdrilldata);
      console.log($scope.chartdrilldata);
		var reportName = chartData.reportName;
      index++;
      var node = document.createElement("div");
      node.setAttribute('id','chart-rend-space-'+index);
      node.setAttribute('class','span6 chart chart_color');
		$scope.chartType=document.getElementById("sel3").value;
      document.getElementById("main-chart-div").appendChild(node);


$("#chart-rend-space-" + index).append("<div class='form-group' id='drag'><bar-chart id='Brands' class='span12' type='"+$scope.chartType+"' title='' divid='container" + index + "' subtitle='' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart><div><span class='glyphicon glyphicon-remove-circle' id='remove"+index+"'></span><span class='glyphicon glyphicon-floppy-save' id='save"+reportName+"'></span></div></div>");
		/*$("#chart-rend-space-" + index).append("<div class='form-group' id='drag'><bar-chart id='Brands' class='span12' type='"+$scope.chartType+"' title='' divid='container" + index + "' subtitle='' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart><div><iron-icon icon='icons:delete' id='remove"+index+"'></iron-icon></div><div>
<iron-icon icon='icons:cloud-download' id='save"+index"'></iron-icon></div></div>");*/
      		/*var draggie = new Draggabilly('#chart-rend-space-' + index, {
       		containment: 'body'
        	});*/
			$( "#remove"+index ).click(function() {
				var id = $(this).attr('id');
				$( "#chart-rend-space-"+id[6] ).slideUp();
				});
			$( "#save"+reportName).click(function(){
				DbService.getSavedChartReport(reportName)
				.then(function(response){
					alert("Chart has been saved!");	
				console.log(response);
				console.log(response.finalresult);
				}, function(error){
              alert("Saving...Failure"+error.status);
				});
   			 })

			var dialog = document.getElementById("dropdown");
  				 if (dialog) {
   				dialog.close();
  			                 }


			
/*$scope.saveChartReport = function(reportName){
	console.log("entered into saving chart function: -"+reportName);
	DbService.getSavedChartReport(reportName)
	.then(function(response){
		alert("Chart has been saved!");	
		console.log(response);
	}, function(error){
		console.log("Failure");
	});
	};*/
});
 // <div ng-click='saveChartReport($scope.reportName)'><iron-icon icon='icons:cloud-download'  id='"+chartData.reportName+"' ></iron-icon>

  });
}]);
});
