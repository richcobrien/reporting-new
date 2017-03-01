define(['angular', './sample-module'], function (angular, controllers) {
  'use strict';
  controllers.controller('reportwizardcontroller', ['$scope','$state','DbService','$compile',function($scope,$state,DbService,$compile) {

$scope.selection1 = 'link1';
//query controller
$scope.savedQueries=[
{"queryName":"Query1",
 "query":"select row_number() over() as rownum,mega_polis.no_of_buildings, mega_polis.plot, mega_polis.mega_polis_population from public.mega_polis where 1=1",
 "dbName":"ckm_db"
},
{"queryName":"Query2",
 "query":"select row_number() over() as rownum,report_details.connection_name, report_details.report_id, report_details.report_name, connection_details.port from public.report_details, public.connection_details where 1=1",
 "dbName":"test_db"
},
{"queryName":"Query3",
 "query":"select row_number() over() as rownum,mega_polis.no_of_buildings, mega_polis.plot, mega_polis.mega_polis_population from public.mega_polis where 1=1",
 "dbName":"ckm_db"
},
{"queryName":"Query4",
 "query":"select row_number() over() as rownum,poc_customer_details.true_cost, poc_customer_details.customer_name, poc_customer_details.customer_region, poc_customer_details.engine_model from public.poc_customer_details where true_cost >= 20000",
 "dbName":"test_db"
}
];
$scope.buttonname=0;
	
$scope.buttons = [{
        label: "Builder",
        style: "block",
        state: true
    }, {
        label: "SQL",
        style: "none",
        state: false
    }]; 

$scope.connectors = [{
        label: "AND",
	state: true
    }, {
        label: "OR",
	state: false
    }]; 

$scope.toggle = function () {
     angular.forEach($scope.buttons, function(value, key) {
   value.state=false;
   value.style="none";
	});
         this.b.state = true;
   	 this.b.style="block";
    }; 

$scope.toggleConnectors = function (item) {
     angular.forEach($scope.connectors, function(value, key) {
	angular.element("#connector"+value.label+item).css({"background-color": "white","color":"#042776","border-radius": "4px","border-color": "blanchedalmond","height": "25px","width": "40px","margin-top": "14px"});
	});
	angular.element("#connector"+this.b.label+item).css({"background-color": "#042776","color":"white","border-radius": "4px","border-color":" blanchedalmond","height": "25px","width": "40px","margin-top": "14px"});
	$scope.whereArray[(item*4)-1]=this.b.label;
	$scope.makeString();
    };   

$scope.dbObject=dbString;
/*{"public":{"POST_DB_SQL_QRY2":{"post_db_query_strng":"character varying","post_db_qry_obj_nm":"character varying"},"report_details":{"date":"timestamp without time zone","connection_name":"character varying","report_id":"integer","report_name":"character varying","status":"boolean"},"chart_data":{"chart_type":"character varying","data":"character varying","report_name":"character varying"},"connection_details":{"connection_name":"character varying","password":"character varying","database":"character varying","port":"character varying","host":"character varying","username":"character varying"},"poc_customer_details":{"true_cost":"numeric","customer_region":"character varying","customer_name":"character varying","engine_model":"character varying"},"pg_stat_statements":{"local_blks_read":"bigint","temp_blks_read":"bigint","shared_blks_dirtied":"bigint","query":"text","shared_blks_hit":"bigint","local_blks_written":"bigint","blk_write_time":"double precision","local_blks_dirtied":"bigint","blk_read_time":"double precision","rows":"bigint","userid":"oid","queryid":"bigint","local_blks_hit":"bigint","temp_blks_written":"bigint","calls":"bigint","dbid":"oid","shared_blks_read":"bigint","total_time":"double precision","shared_blks_written":"bigint"},"querytable":{"post_db_query_strng":"text","post_db_qry_obj_nm":"character varying"}}
    ,
    "publi":{"report_details":{"date":"timestamp without time zone","connection_name":"character varying","report_id":"integer","report_name":"character varying","status":"boolean"},"chart_data":{"chart_type":"character varying","data":"character varying","report_name":"character varying"},"connection_details":{"connection_name":"character varying","password":"character varying","database":"character varying","port":"character varying","host":"character varying","username":"character varying"},"poc_customer_details":{"true_cost":"numeric","customer_region":"character varying","customer_name":"character varying","engine_model":"character varying"},"pg_stat_statements":{"local_blks_read":"bigint","temp_blks_read":"bigint","shared_blks_dirtied":"bigint","query":"text","shared_blks_hit":"bigint","local_blks_written":"bigint","blk_write_time":"double precision","local_blks_dirtied":"bigint","blk_read_time":"double precision","rows":"bigint","userid":"oid","queryid":"bigint","local_blks_hit":"bigint","temp_blks_written":"bigint","calls":"bigint","dbid":"oid","shared_blks_read":"bigint","total_time":"double precision","shared_blks_written":"bcharacter varyingigint"},"querytable":{"post_db_query_strng":"text","post_db_qry_obj_nm":"character varying"}}
    };*/
		$scope.conditions=["=",">","<",">=","<=","!=","LIKES"];
    $scope.schema=[];
    $scope.database={};
    $scope.column={};
    $scope.datatype={};
    $scope.optionalDb=[];
    $scope.selectedDb=[];
    $scope.optionalAttribute=[];
    $scope.selectedAttribute=[];
    $scope.typeOffiels=[];
    $scope.attrAsString = "";
    $scope.dbAsString="";
    $scope.selectedDbVsAttr={};
    $scope.tempObject={};
    $scope.selectedWhereAttr={"db":"","attry":"1"};
    $scope.selectedWhereAttrArray=[];
    $scope.selectedCondition=[];
    $scope.conditionValue=[];
    $scope.textQuery="";
    $scope.typeOffiels[0]="text";
    $scope.selectedWhereAttrArray[0]={"db":"","attry":"1"};
    $scope.conditionValue[0]="1";
    $scope.selectedCondition[0]="=";
    $scope.whereArray=[];
    $scope.whereAsString="1=1";
    $scope.whereArray[0]=$scope.selectedWhereAttrArray[0].attry;
    $scope.whereArray[1]=$scope.selectedCondition[0];
    $scope.whereArray[2]=$scope.conditionValue[0];
    //$scope.queryobj="select"+$scope.attrAsString+" from "+$scope.dbAsString+" where "+$scope.whereAsString; //select {{attrAsString}} from {{dbAsString}} where {{whereAsString}};
	var whereCount=0;
    angular.forEach($scope.dbObject, function(value, key) {
  	$scope.schema.push(key);
    	$scope.dbs=[];
          angular.forEach(value, function(value, key) {
              $scope.dbs.push(key);
              $scope.clms=[];
              angular.forEach(value, function(value, key) {
              	  $scope.clms.push(key);
                  $scope.datatype[key]=value;
              });
              $scope.column[key]=$scope.clms;
	   });
  	$scope.database[key]=$scope.dbs;
     });

$scope.changeInSchema = function(){
    		$scope.optionalDb=$scope.database[$scope.selectedSchema];
		//alert("selected schema..."+$scope.selectedSchema);
    };
    $scope.changeInDb = function(){
    		$scope.optionalAttribute=[];
        $scope.dbAsString="";
    		angular.forEach($scope.selectedDb, function(values){
            angular.forEach($scope.column[values], function(value){
            		$scope.tempObject={};
                $scope.tempObject["db"]=values;
                $scope.tempObject["attry"]=value;
    		$scope.optionalAttribute.push($scope.tempObject);
            });
            switch($scope.dbAsString){
            		case "":
            				$scope.dbAsString = $scope.selectedSchema+"."+values;
                    break;
                default:
            				$scope.dbAsString = $scope.dbAsString + ", "+$scope.selectedSchema+"."+values;
            
            }
        });
        $scope.QueryObject = "select row_number() over() as rownum,"+$scope.attrAsString+" from "+$scope.dbAsString;
    };
    $scope.changeInAttribute = function(){
    		$scope.attrAsString="";
		$scope.selectedWhereAttrArray[0]='';
    		angular.forEach($scope.selectedAttribute, function(value){
                    switch($scope.attrAsString){
            		case "":
            			$scope.attrAsString = value.db+"."+value.attry;
				//alert("changeInAttribute blank..."+$scope.attrAsString);
                    		break;
                	default:
            			$scope.attrAsString = $scope.attrAsString + ", "+value.db+"."+value.attry;
				//alert("changeInAttribute default..."+$scope.attrAsString);
                	}
                });
        $scope.QueryObject = "select row_number() over() as rownum,"+$scope.attrAsString+" from "+$scope.dbAsString;
    };
    $scope.changeInWhereAttr = function(item){
	$scope.whereArray[(item*4)]=$scope.selectedWhereAttrArray[item].attry;
	$scope.makeString();
    	switch ($scope.datatype[$scope.selectedWhereAttrArray[item].attry]) {
            case "text":
            case "character varying":
                $scope.typeOffiels[item]="text";
                break;
            case 'numeric':
            case 'bigint':
            case 'double precision':
            case 'integer':
                $scope.typeOffiels[item]="number";
                break;
            case 'timestamp without time zone':
                $scope.typeOffiels[item]="date";
                break;
	    case 'boolean':
                $scope.typeOffiels[item]="checkbox";
                break;
            default:

        }
    };

$scope.changeInCondition=function(item){
	$scope.whereArray[(item*4)+1]=$scope.selectedCondition[item];
	$scope.makeString();
};
$scope.changeInValue=function(item){
	$scope.whereArray[(item*4)+2]=$scope.conditionValue[item];
	$scope.makeString();
}
$scope.addWhereClause = function() {
  	whereCount++;
        $scope.buttonname;
     var myEl = angular.element( document.querySelector( '#connectorDiv' ) );
     myEl.append($compile('<div id="where'+whereCount+'" class="AndOrDiv"><div class="col-md-4" ><div class="col-md-4"><button id="connector{{b.label}}'+whereCount+'" ng-click="toggleConnectors('+whereCount+')" name="'+$scope.buttonname+'" class="connectorBtn" ng-class="{on:b.state}" ng-repeat="b in connectors">{{b.label}}</button></div><div class="col-md-8"><select ng-model="selectedWhereAttrArray['+whereCount+']" ng-change="changeInWhereAttr('+whereCount+')" ng-options="value.attry for value in selectedAttribute" class="form-control"></select></div></div><div class="col-md-4"><select ng-model="selectedCondition['+whereCount+']" ng-change="changeInCondition('+whereCount+')" ng-options="value for value in conditions" class="form-control"></select></div><div class="col-md-4"><div class="col-md-6"><input type="{{typeOffiels['+whereCount+']}}" ng-change="changeInValue('+whereCount+')" ng-model="conditionValue['+whereCount+']" class="form-control"></div><div class="col-md-6"><div class="divP1"><a href="#" class="btn btn-info btn-lg" ng-click="removeWhereClause('+whereCount+')" id="closebutton"><span class="glyphicon glyphicon-remove icon-colour"></span></a></div></div></div></div>')($scope));     
	$scope.typeOffiels[whereCount]="text";
	$scope.selectedWhereAttrArray[whereCount]={"db":"","attry":"1"};
	$scope.conditionValue[whereCount]="1";
	$scope.selectedCondition[whereCount]="=";
	$scope.whereArray[(whereCount*4)-1]="AND";	
	$scope.whereArray[(whereCount*4)]=$scope.selectedWhereAttrArray[whereCount].attry;
	$scope.whereArray[(whereCount*4)+1]=$scope.selectedCondition[whereCount];
	$scope.whereArray[(whereCount*4)+2]=$scope.conditionValue[whereCount];
	$scope.makeString();	
}
$scope.removeWhereClause = function(item){
	var removeWhere = document.getElementById('where'+item);
	removeWhere.remove(removeWhere);
	whereCount--;
	$scope.basePossition=item*4;
	$scope.whereArray[$scope.basePossition-1]=null;
	$scope.whereArray[$scope.basePossition]=null;
	$scope.whereArray[$scope.basePossition+1]=null;
	$scope.whereArray[$scope.basePossition+2]=null;
	$scope.makeString();
}
$scope.makeString = function(){
	var index=0;
	angular.forEach($scope.whereArray, function(value,key){
	if(value!=null){
		if(key==0){
			$scope.whereAsString=value;
			if($scope.datatype[value]=="timestamp without time zone" || $scope.datatype[value]=="character varying" || $scope.datatype[value]=="text"){
               			index=key+2;
			}else{}
		}
		else{
			if($scope.datatype[value]=="timestamp without time zone" || $scope.datatype[value]=="character varying" || $scope.datatype[value]=="text"){
               			index=key+2;
			}else{}
			if(index==key){
				$scope.whereAsString=$scope.whereAsString+" '"+value+"'";
			}
			else{
				$scope.whereAsString=$scope.whereAsString+" "+value;
			}
		}
	}
	});
        $scope.QueryObject = "select row_number() over() as rownum,"+$scope.attrAsString+" from "+$scope.dbAsString+" where "+$scope.whereAsString;
}
/*$( "#remove"+index ).click(function() {
	var id = $(this).attr('id');
	$().slideUp();
});
*/
$scope.saveAndexecuteQuery = function(){
		document.getElementById("connection-loading").style.display = 'block';
		document.getElementById("loadingDiv").style.display = 'block';
	if($scope.QueryObject.match("where")) {
	} else {
		$scope.QueryObject =$scope.QueryObject+" where "+$scope.whereAsString;
	}
	if($scope.QueryName=="")
        {
		alert("Please Enter the Query Name!");
	}
	else
	{
		DbService.loadingData($scope.QueryObject,$scope.QueryId,$scope.QueryName)
		.then(function(response){
		document.getElementById("connection-loading").style.display = 'none';
		document.getElementById("loadingDiv").style.display = 'none';
                        var responseTableData=response;
                 	$scope.records=responseTableData;
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
                                
		},function(error){
			console.log("error in loading data function: "+error.status);
		});
	}
};

$scope.executeQuery = function(){
		document.getElementById("connection-loading").style.display = 'block';
		document.getElementById("loadingDiv").style.display = 'block';
		if($scope.QueryObject.match("where")) {
		} else {
			$scope.QueryObject = "select row_number() over() as rownum,"+$scope.attrAsString+" from "+$scope.dbAsString+" where "+$scope.whereAsString;
		}
		if($scope.QueryName=="")
          		{alert("Please Enter the Query Name!");}
		else
		{
			DbService.loadingData($scope.QueryObject,$scope.QueryId,$scope.QueryName+"^%q6389476625bn423454n2ghf34gy")
			.then(function(response){
				document.getElementById("connection-loading").style.display = 'none';
				document.getElementById("loadingDiv").style.display = 'none';
                                var responseTableData=response;
                   		$scope.records=responseTableData;
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
                                
			},function(error){
				console.log("error in loading data function: "+error.status);
			});
		}
	};

		


$scope.QueryObject = "select row_number() over() as rownum,"+$scope.attrAsString+" from "+$scope.dbAsString;

$scope.initQueryLoading = function(){
	DbService.getQueryDetails()
	.then(function(queryData){
		$scope.Queries=queryData.allQuery;
		DbService.getConnectionName()
		.then(function(con_name){
			$scope.connection_Nm=con_name.conName;
		},function(error){
	    		console.log("failure");
	 	});
	},function(error){
    		console.log("failure");
 	});
	/*DbService.getConName()
	.then(function(con_name){
		alert("Inside controller : "+con_name);
		$scope.connection_Name=con_name;
	},function(error){
    		console.log("failure");
 	});*/
};
$scope.getQueryName = function(value){
	$scope.queryName=value.query_name;
	$scope.QueryName=$scope.queryName;
	$scope.QueryObject=value.query;
	$scope.QueryId = value.query_id;
	if(value.reports_per_query!="")
		$scope.Reports=value.reports_per_query.split(',');
}

$scope.clearQuery = function(){
	$scope.QueryName="";
	$scope.QueryObject="";
	$scope.QueryId = 0;
}

$scope.displayChartFromReport = function(reportName){
	DbService.getChartFromReport(reportName)
	.then(function(chartData){
		
		$scope.chartdata = JSON.stringify(chartData.mainJSON);
		$scope.chartdrilldata = JSON.stringify(chartData.drillDownModel);
		$scope.reportName = JSON.stringify(chartData.reportName);
		$scope.type = JSON.stringify(chartData.chartType);
		
		$("#main-chart-div").append("<div class='right-side-chart' id='right-side-chart-div'><bar-chart class='span12' type='"+chartData.chartType+"' divid='container2' width=350 height=220 title='' subtitle='Click the columns to view versions.' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart></div>");
		
	},function(error){
    		console.log("failure on chart rendering");
 	});

};

$scope.deleteQueryName = function(item) {		
	$( "#deleteQueryDiv"+item).slideUp();
};

$scope.delete_Query_Confirmation = function(item){
	//$('#myModal').modal();
	//$('#deleteButton').html('<a class="btn btn-danger" onclick="delete_Query('+item+')">Delete</a>');
	/*$('#deleteButton1').html('<button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="delete_Query('+item+')">Delete</button>');*/
	$( "#deleteButton1").click(function() {
			DbService.deleteQuery(item)
			.then(function(response){
				$( "#deleteQueryDiv"+item).slideUp();
			},function(error){
				console.log("error in loading data function: "+error.status);
			});
	});
};

/*$scope.delete_Query = function(item){
		
			alert("inside delete query..."+item);
			DbService.deleteQuery(item)
			.then(function(response){
				alert("Next....!");
				$( "#deleteQueryDiv"+item).slideUp();
				alert("Query Deleted Successfully!");
			},function(error){
				console.log("error in loading data function: "+error.status);
			});
		
};*/

$scope.delete_ChartReport = function(report_Name) {		
	$( "#deleteChartDiv"+report_Name).slideUp();
};

$scope.delete_ChartReport_Confirmation = function(report_Name){
	//$('#myModal').modal();
	//$('#deleteButton').html('<a class="btn btn-danger" onclick="delete_Query('+item+')">Delete</a>');
	/*$('#deleteButton1').html('<button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="delete_Query('+item+')">Delete</button>');*/
	$( "#deleteButton2").click(function() {
			DbService.deleteChartReport(report_Name)
			.then(function(response){
				$( "#deleteChartDiv"+report_Name).slideUp();
				//alert("Chart Deleted Successfully!");
			},function(error){
				console.log("error in loading data function: "+error.status);
			});
	});
};

/*
$scope.delete_ChartReport = function(report_Name){
		
			DbService.deleteChartReport(report_Name)
			.then(function(response){
				$( "#deleteChartDiv"+report_Name).slideUp();
				//alert("Chart Deleted Successfully!");
			},function(error){
				console.log("error in loading data function: "+error.status);
			});
		
};*/

$scope.QueryId=0;
$scope.QueryName="";

//start of chart geneartion. . . . .
$scope.charttitle = "";
    	$scope.chartdata = "";
    	$scope.chartdrilldata = "";


	$scope.parameters={};
	
	

	$scope.viewTableService = function(){
 	   	DbService.viewTable()
 	   	.then(function(tables){
                  $scope.records=tables;
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

	
	$scope.YValues=[];
	$scope.XValues=[];
	$scope.getParameters = function(){
	DbService.chartColumnDataFunction()
	.then(function(response){
		for (var key in response) {
			$scope.parameters = response[key];
		} 
		
		angular.forEach($scope.parameters, function(key,value) {
			switch (key) {
            case "text":
            case "character varying":
                $scope.XValues.push(value);
                break;
            case 'numeric':
            case 'bigint':
            case 'double precision':
            case 'integer':
                $scope.YValues.push(value);
                break;
            default:

        }	
		});
		
	}, function(error){
		console.log("Failure");
	});
	};
     
    var index=0;
var x=10;
//$("#ok_button").click(function () {
$scope.generateChart = function(){
//alert("Inside chart function");
	var xaxis = $("#sel1").val();
   var yaxis = $("#sel2").val();
	var drilldown = $("#sel4").val();
	var chartType = $("#sel3").val();
   DbService.getChartData(xaxis, yaxis, drilldown, chartType)
   .then(function(chartData){
		$scope.chart_Data=chartData;
		$scope.chartdata = JSON.stringify(chartData.mainJSON);
     		$scope.chartdrilldata = JSON.stringify(chartData.drillDownModel);
		var reportName = chartData.reportName;
      index++;
      var node = document.createElement("div");
      node.setAttribute('id','chart-rend-space-'+index);
      node.setAttribute('class','span6 chart chart_color');
		$scope.chartType=document.getElementById("sel3").value;
      document.getElementById("main-chart-div").appendChild(node);

$scope.savingStatus="Saving...";
$scope.saveFlag=false;
$("#chart-rend-space-" + index).append("<div class='form-group' id='drag'><bar-chart id='Brands' class='span12' type='"+$scope.chartType+"' title='' divid='container" + index + "' subtitle='' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart><div><span class='glyphicon glyphicon-remove-circle' id='remove"+index+"'></span><span class='glyphicon glyphicon-floppy-save' id='save"+index+"' data-toggle='modal' data-target='#saveModal'></span></div></div>");
		/*$("#chart-rend-space-" + index).append("<div class='form-group' id='drag'><bar-chart id='Brands' class='span12' type='"+$scope.chartType+"' title='' divid='container" + index + "' subtitle='' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart><div><iron-icon icon='icons:delete' id='remove"+index+"'></iron-icon></div><div>
<iron-icon icon='icons:cloud-download' id='save"+index"'></iron-icon></div></div>");*/
      		/*var draggie = new Draggabilly('#chart-rend-space-' + index, {
       		containment: 'body'
        	});*/
			$( "#remove"+index ).click(function() {
				var id = $(this).attr('id');
				$( "#chart-rend-space-"+id[6] ).slideUp();
				});
			$( "#save"+index).click(function(){
				alert("saveFlag outside if "+$scope.saveFlag);
				if($scope.saveFlag==false)
				{
					DbService.getSavedChartReport($scope.chart_Data)
					.then(function(response){
						$scope.savingStatus="Saved";
						$scope.saveFlag=true;
						alert("saveFlag inside if "+$scope.saveFlag);
					}, function(error){
		      				alert("Saving...Failure"+error.status);
						$scope.savingStatus="Failed";
					});
				}
				else
					$scope.savingStatus="Chart is already Saved!";
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
//});
  
 }; 

//End of chart generation . . . .



}]);
});
