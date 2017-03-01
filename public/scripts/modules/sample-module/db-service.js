define(['angular', './sample-module'], function(angular, module) {
    'use strict';

    /**
     * Cube home service is used for all services required for home page
     */
    module.factory('DbService', ['$q', '$http',function($q, $http) {
        	var protocol = 'https';
        	var hostUrl = 'https://reportingtool-v40.run.aws-usw02-pr.ice.predix.io';
		var Connection_Name="";
		var _connectedLine = function(){
		return "Gotcha";
		}
	         //var connection_Name="";
/*******************Dashboard services************************/
//dash board table details fetching service
	  	var _dasboardTableDetails = function(){
      		var deferred = $q.defer();
		var request = {
                	method: 'POST',
                	url: 'https://reportingtool-dashboard-v40.run.aws-usw02-pr.ice.predix.io/Dashboard' ,
		        //data : connectionDetailsDashboard,
                	headers: {
                	    'Content-Type': 'application/json'
                	}
                	};
		$http(request).then(function(response){
			deferred.resolve(response.data);
		},function(error){
			deferred.reject('Error fetching Options' + error);
		});
      		return deferred.promise;
	};

//get chart on dash board
	var _getChartFromReport = function(reportName){
		var deferred = $q.defer();
            	var req = {
                	method: 'GET',
			url: 'https://reportingtool-dashboard-v40.run.aws-usw02-pr.ice.predix.io/getChartOnDash?reportname='+reportName ,
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
            		 };
            	$http(req)
            	.then(function(response){
                	deferred.resolve(response.data);
            	}, function(error){
                	deferred.reject('Error fetching Options' + error);
            	});
            	return deferred.promise;
	};

/*******************Meta data loader services************************/
//getting connection details
	var _initiateConnectionDetails = function(){
      var deferred = $q.defer();
		var request = {
                	method: 'POST',
                	url: 'https://reportingtool-metadataloader-v40.run.aws-usw02-pr.ice.predix.io/getAllConnections' ,
			//data: connectionDetailsDashboard,
                	headers: {
                	    'Content-Type': 'application/json'
                	}
                	};
		$http(request).then(function(response){
			deferred.resolve(response.data);
		},function(error){
			deferred.reject('Error fetching Options' + error);
		});
      		return deferred.promise;
	};

//Loading meta data
        var _makeDbConnection = function(requestData){
		Connection_Name=requestData.connectionName;
            	requestData = angular.toJson(requestData);
		//connection_Name=requestData.connectionName;
		//alert("con name from makeDbConnection : "+connection_Name);
            	var deferred = $q.defer();
	    	var req = {
                	method: 'POST',
                	url: 'https://reportingtool-metadataloader-v40.run.aws-usw02-pr.ice.predix.io/LoadMetaData' ,
                	data : requestData,
                	headers: {
                    		'Content-Type': 'application/json'
                		 }
            		 };
		$http(req).then(function(response){
                	deferred.resolve(response.data);
            	}, function(error){
                	deferred.reject('Error fetching Options' + error);
            	});
            	return deferred.promise;
        };

var _saveDBconn = function(requestData){
		Connection_Name=requestData.connectionName;
            	requestData = angular.toJson(requestData);
		//connection_Name=requestData.connectionName;
		//alert("con name from makeDbConnection : "+connection_Name);
            	var deferred = $q.defer();
	    	var req = {
                	method: 'POST',
                	url: 'https://reportingtool-metadataloader-v40.run.aws-usw02-pr.ice.predix.io/saveConnectionDetails' ,
                	data : requestData,
                	headers: {
                    		'Content-Type': 'application/json'
                		 }
            		 };
		$http(req).then(function(response){
                	deferred.resolve(response.data);
            	}, function(error){
                	deferred.reject('Error fetching Options' + error);
            	});
            	return deferred.promise;
        };
	/*var _getConName=function(){
		//alert("con name : "+connection_Name);
		return connection_Name;
	};*/

	var _getConnectionName = function(){
		var deferred = $q.defer();
		var cname={"conName":Connection_Name};
		deferred.resolve(cname);
		return deferred.promise;
	}; 

/*******************Data loader services************************/
//Loading data for Save and Execute Query
	var _loadingData = function(query,qid,qname){
		var request = {
 			 "sql":query,
			 "query_name":qname,
			 "query_id":qid
				};
		var deferred = $q.defer();

		var req = {
                	method: 'POST',
                	url: 'https://reportingtool-dataloader-v40.run.aws-usw02-pr.ice.predix.io/DataLoader',
                	data : request,
                	headers: {
                    		'Content-Type': 'application/json'
                		 }
         		};
		$http(req).then(function(response){
			deferred.resolve(response.data);
		},function(error){
		});
		 return deferred.promise;
	};



//Column fetching to converter
	var _chartColumnDataFunction = function(){
		var deferred = $q.defer();
		/*var request = { 
			 "host" :"10.72.6.143",
			 "port":"5432",
			 "username":"u067c395e2a2d463aba4eb340114c5a43",
			 "password":"407dd8f1c87448d09263582e5a4bc5b8", 
			 "database":"d1bf66b44432f475aa97be95d07f5a4f5",
 			 "sql":"",
   			 "reportName":"postgres_report"};*/
		var req = {
                	method: 'POST',
                	url: 'https://reportingtool-dataloader-v40.run.aws-usw02-pr.ice.predix.io/chartColumnData' ,
			//data : request,
                	headers: {
                	    'Content-Type': 'application/json'
                		}
                	};

		$http(req).then(function(response){
		deferred.resolve(response.data);

		},function(error){
                //deferred.reject('Error fetching Options' + error);	
		});
		 return deferred.promise;

	};

/*******************Data Converter services************************/
//getting chart data from form
        var _getChartData = function(xaxis, yaxis, drilldown, chartType){
            	var deferred = $q.defer();
            	var req = {
                	method: 'GET',
			url: 'https://reportingtool-dataconverter-v40.run.aws-usw02-pr.ice.predix.io/dataConvetor?xaxis='+xaxis+'&yaxis='+yaxis+'&drilldown='+drilldown+'&charttype='+chartType ,
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
            		 };
            	$http(req)
            	.then(function(response){
                	deferred.resolve(response.data);
            	}, function(error){
                	deferred.reject('Error fetching Options' + error);
            	});
            	return deferred.promise;
        };

//saving chart
	var _getSavedChartReport = function(chartData){
		var deferred = $q.defer();
            	var req = {
                	method: 'POST',
			url: 'https://reportingtool-dataconverter-v40.run.aws-usw02-pr.ice.predix.io/saveChart' ,
			data : chartData,
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
            		 };
      $http(req)
		.then(function(response){
                	deferred.resolve(response.data);
            	}, function(error){
                	deferred.reject('Error fetching Options' + error);
            	});
            	return deferred.promise;	
	};

var _getQueryDetails = function(){
	var deferred = $q.defer();
            	var req = {
                	method: 'POST',
			url: 'https://reportingtool-dataloader-v40.run.aws-usw02-pr.ice.predix.io/getAllQueries',
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
            		 };
      		$http(req)
		.then(function(response){
                	deferred.resolve(response.data);
                	console.log(response.data);
            	}, function(error){
                	deferred.reject('Error fetching query' + error);
            	});
            	return deferred.promise;
};

var _deleteQuery = function(queryId){
	var deferred = $q.defer();
            	var req = {
                	method: 'GET',
			url: 'https://reportingtool-dataloader-v40.run.aws-usw02-pr.ice.predix.io/deleteQuery?queryid='+queryId ,
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
            		 };
      		$http(req)
		.then(function(response){
                	deferred.resolve(response.data);
            	}, function(error){
                	deferred.reject('Error fetching query' + error);
            	});
            	return deferred.promise;
};
var _deleteChartReport = function(reportName){
	var deferred = $q.defer();
            	var req = {
                	method: 'GET',
			url: 'https://reportingtool-dataloader-v40.run.aws-usw02-pr.ice.predix.io/deleteReport?reportname='+reportName ,
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
            		 };
      		$http(req)
		.then(function(response){
                	deferred.resolve(response.data);
            	}, function(error){
                	deferred.reject('Error fetching query' + error);
            	});
            	return deferred.promise;
};

//View Tables
	var _viewTable= function(){
                 var deferred = $q.defer();
                 var req ={method: 'POST',
			url: 'https://reportingtool-dataloader-v40.run.aws-usw02-pr.ice.predix.io/getQueryOutput' ,
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
                           };
         $http(req)
		.then(function(response){
                         deferred.resolve(response.data);
                         console.log("Tables fetched");             
                }, function(error){       
                         deferred.reject('Error fetching Options' + error);
                         console.log("Tables Fetching error");
                });
                  return deferred.promise;	
	};

	var _getQueriesSavedCount= function(){
                 var deferred = $q.defer();
                 var req ={
                          method: 'POST',
			url: 'https://reportingtool-dashboard-v40.run.aws-usw02-pr.ice.predix.io/QueryCount ',
                	headers: {
                    	'Content-Type': 'application/json'
                	 	 }
                           };
         $http(req)
		.then(function(response){
                         deferred.resolve(response.data);
                         //console.log("Tables fetched");             
                }, function(error){       
                         deferred.reject('Error fetching Options' + error);
                         //console.log("Tables Fetching error");
                });
                  return deferred.promise;	
	};
	var _getMetaDataForQueryDesign = function(){
		var deferred = $q.defer();
      var req ={
      	method: 'POST',
			url: 'https://reportingtool-dataloader-v40.run.aws-usw02-pr.ice.predix.io/getSchemaFromRedis',
         headers: {
         	'Content-Type': 'application/json'
            },
            data: Connection_Name
         };
     	$http(req)
		.then(function(response){
			alert(Connection_Name);
      	deferred.resolve(response.data);             
       }, function(error){
       	deferred.reject('Error fetching Options' + error);
       	});
      return deferred.promise;
	};
/*******************return statements of service procedures************************/
        return {
			dasboardTableDetails : _dasboardTableDetails,
	    	loadingData : _loadingData,
			connectedLine : _connectedLine,
         initiateConnectionDetails : _initiateConnectionDetails,
         makeDbConnection : _makeDbConnection,
         getChartData : _getChartData,
			chartColumnDataFunction : _chartColumnDataFunction,
			getChartFromReport : _getChartFromReport,
			getSavedChartReport : _getSavedChartReport,
         viewTable : _viewTable,
			getQueryDetails : _getQueryDetails,
			deleteQuery : _deleteQuery,
			deleteChartReport : _deleteChartReport,
			getConnectionName : _getConnectionName,
			getQueriesSavedCount : _getQueriesSavedCount,
			saveDBconn : _saveDBconn,
			getMetaDataForQueryDesign : _getMetaDataForQueryDesign
     };
    }]);
});
