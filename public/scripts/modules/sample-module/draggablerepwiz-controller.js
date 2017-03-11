define(['angular', './sample-module', 'dragularModule', 'ngDraggable'], function(angular, controllers) {
    'use strict';
    controllers.controller('draggablerepwizcontroller', ['dragularService', '$scope', '$state', 'DbService', '$compile', '$timeout', function(dragularService, $scope, $state, DbService, $compile, $timeout) {
        $scope.dragInit = function() {
            $timeout(function() {
                dragularService.cleanEnviroment();
                var containerLeft = document.querySelectorAll('.containerVertical');
                var nodeArray = [];
                $scope.selectedAttrs = [];
                $scope.completeData = [];
                $scope.tempCompleteData = [];
                $scope.joinData1 = [];
                $scope.joinData2 = [];
                $scope.joinData3 = [];
                $scope.joinData4 = [];
                angular.forEach($scope.tables, function(value2) {
                    angular.forEach($scope.attrList, function(value1) {
                        if (value2 == value1.table) {
                            $scope.tempCompleteData.push(value1);
                        }
                    });
                    $scope.completeData.push($scope.tempCompleteData);
                    $scope.tempCompleteData = [];
                });
                angular.forEach(containerLeft, function(value, key) {
                    nodeArray.push(value);
                });
                dragularService(nodeArray, {
                    containersModel: $scope.completeData,
                    copy: true,
                    isContainer: function isContainer(el) {
                        // return el.id === 'selectDiv';
                        if (el.id === 'selectDiv') {
                            return el.id === 'selectDiv';
                        } else if (el.id === 'joinDrop1') {
                            return el.id === 'joinDrop1';
                        } else if (el.id === 'joinDrop2') {
                            return el.id === 'joinDrop2';
                        } else if (el.id === 'joinDrop3') {
                            return el.id === 'joinDrop3';
                        } else if (el.id === 'joinDrop4') {
                            return el.id === 'joinDrop4';
                        }
                    },
                    isContainerModel: function getModel(el) {
                        // return $scope.joinData1;
                        if (el.id === 'selectDiv') {
                            return $scope.selectedAttrs;
                        } else if (el.id === 'joinDrop1') {
                            return $scope.joinData1;
                        } else if (el.id === 'joinDrop2') {
                            return $scope.joinData2;
                        } else if (el.id === 'joinDrop3') {
                            return $scope.joinData3;
                        } else if (el.id === 'joinDrop4') {
                            return $scope.joinData4;
                        }
                    }
                });

                // dragularService(nodeArray, {
                //     containersModel: $scope.completeData,
                //     copy: true,
                //     scope: $scope,
                //     isContainer: function isContainer(el) {
                //         return el.id === 'selectDiv';
                //     },
                //     isContainerModel: function getModel() {
                //         return $scope.selectedAttrs;
                //     }
                // });
                // dragularService(nodeArray, {
                //     containersModel: $scope.completeData,
                //     copy: true,
                //     isContainer: function isContainer(el) {
                //         return el.id === 'joinDrop2';
                //     },
                //     isContainerModel: function getModel() {
                //         return $scope.joinData2;
                //     }
                // });
                /*$scope.$on('dragulardrop', function() {
                                        		$scope.sqlString="select row_number() over() as rownum,";
                                        		$scope.selectedAttrString="";
                                        		angular.forEach($scope.selectedAttrs,function(value){
                                        			if($scope.selectedAttrs.length==1)
                                        				$scope.selectedAttrString=value.table+"."+value.attributes;
                                        			else{
                                        				$scope.selectedAttrString=$scope.selectedAttrString + value.table+"."+value.attributes+",";
                                        			}
                                        		});
                                        	});
                                        	return function() {
                                            console.log('drop', arguments);
                                          };
                                        });*/
            }, 1000);
        };
        $scope.dragInit();
        $scope.selection1 = 'link1';
        //query controller

        $scope.buttonname = 0;

        $scope.buttons = [{
            label: 'Builder',
            style: 'block',
            state: true
        }, {
            label: 'SQL',
            style: 'none',
            state: false
        }];

        $scope.connectors = [{
            label: 'AND',
            state: true
        }, {
            label: 'OR',
            state: false
        }];

        $scope.toggle = function() {
            angular.forEach($scope.buttons, function(value, key) {
                value.state = false;
                value.style = 'none';
            });
            this.b.state = true;
            this.b.style = 'block';
        };


        $scope.toggleConnectors = function(item) {
            angular.forEach($scope.connectors, function(value, key) {
                angular.element('#connector' + value.label + item).css({
                    "background-color": "white",
                    "color": "#042776",
                    "border-radius": "4px",
                    "border-color": "blanchedalmond",
                    "height": "25px",
                    "width": "40px",
                    "margin-top": "14px"
                });
            });
            angular.element("#connector" + this.b.label + item).css({
                "background-color": "#042776",
                "color": "white",
                "border-radius": "4px",
                "border-color": " blanchedalmond",
                "height": "25px",
                "width": "40px",
                "margin-top": "14px"
            });
            $scope.whereArray[(item * 4) - 1] = this.b.label;
            $scope.makeString();
        };




        // $scope.dbObject = dbString;
        $scope.dbObject = {
            "public": { "flat": { "no_of_members": "numeric", "flat_name": "character varying" }, "buildings": { "building_name": "character varying", "building_population": "numeric", "no_of_flats": "numeric" }, "pg_stat_statements": { "local_blks_read": "bigint", "temp_blks_read": "bigint", "shared_blks_dirtied": "bigint", "query": "text", "shared_blks_hit": "bigint", "local_blks_written": "bigint", "blk_write_time": "double precision", "local_blks_dirtied": "bigint", "blk_read_time": "double precision", "rows": "bigint", "userid": "oid", "queryid": "bigint", "local_blks_hit": "bigint", "temp_blks_written": "bigint", "calls": "bigint", "dbid": "oid", "shared_blks_read": "bigint", "total_time": "double precision", "shared_blks_written": "bigint" }, "room_availability": { "plot": "character varying", "avail_rooms": "numeric" }, "mega_polis": { "plot": "character varying", "no_of_buildings": "numeric", "mega_polis_population": "numeric" } },
            "publi": { "fla": { "no_of_member": "numeric", "flat_name": "character varying" }, "building": { "building_ame": "character varying", "building_population": "numeric", "no_of_flats": "numeric" }, "pg_stat": { "local_blks_read": "bigint", "temp_blks_read": "bigint", "shared_blks_dirtied": "bigint", "query": "text", "shared_blks_hit": "bigint", "local_blks_written": "bigint", "blk_write_time": "double precision", "local_blks_dirtied": "bigint", "blk_read_time": "double precision", "rows": "bigint", "userid": "oid", "queryid": "bigint", "local_blks_hit": "bigint", "temp_blks_written": "bigint", "calls": "bigint", "dbid": "oid", "shared_blks_read": "bigint", "total_time": "double precision", "shared_blks_written": "bigint" }, "room_availablity": { "plot": "character varying", "avail_rooms": "numeric" }, "mega_pois": { "plot": "character varying", "no_of_buildings": "numeric", "mega_polis_population": "numeric" } }
        };
        DbService.getMetaDataForQueryDesign().then(function(response) {
            alert(response);
        }, function(error) {
            console.log("error in loading data function: " + error.status);
        });

        $scope.changeInSchema = function() {
            $scope.queryBuilderValidation = "";
            $scope.optionalDb = $scope.database[$scope.selectedSchema];
            //alert("selected schema..."+$scope.selectedSchema);
        };
        $scope.changeInDb = function() {
            $scope.optionalAttribute = [];
            $scope.dbAsString = "";
            console.dir($scope.selectedDb);
            angular.forEach($scope.selectedDb, function(values) {
                angular.forEach($scope.column[values], function(value) {
                    $scope.tempObject = {};
                    $scope.tempObject["db"] = values;
                    $scope.tempObject["attry"] = value;
                    $scope.optionalAttribute.push($scope.tempObject);
                });
                switch ($scope.dbAsString) {
                    case "":
                        $scope.dbAsString = $scope.selectedSchema + "." + values;
                        break;
                    default:
                        $scope.dbAsString = $scope.dbAsString + ", " + $scope.selectedSchema + "." + values;

                }
            });
            $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.dbAsString;
            var vm = this;
            if (vm.autoJoinCheck == true) {
                vm.autoJoinCheck = false;
                $scope.autoJoinCheckFunction();
            }
        };
        $scope.changeInAttribute = function() {
            $scope.queryBuilderValidation = "";
            $scope.attrAsString = "";
            $scope.selectedWhereAttrArray[0] = '';
            console.log($scope.selectedAttribute);
            angular.forEach($scope.selectedAttribute, function(value) {
                switch ($scope.attrAsString) {
                    case "":
                        $scope.attrAsString = value.db + "." + value.attry;
                        //alert("changeInAttribute blank..."+$scope.attrAsString);
                        break;
                    default:
                        $scope.attrAsString = $scope.attrAsString + ", " + value.db + "." + value.attry;
                        //alert("changeInAttribute default..."+$scope.attrAsString);
                }
            });
            $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.dbAsString;
        };
        $scope.joinStatement = "";
        $scope.firstJoinAttr = {};
        $scope.secondJoinAttr = {};
        $scope.changeInJoin = function() {
            var vm = this;
            if (vm.selectedJoinOpt == "CROSS JOIN") {
                $scope.joinStatement = $scope.selectedDb[0] + " " + vm.selectedJoinOpt + " " + $scope.selectedDb[1];
                $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.joinStatement;
                $scope.dbAsString = $scope.joinStatement;
            } else {
                $scope.joinStatement = vm.firstJoinAttr.db + " " + vm.selectedJoinOpt + " " + vm.secondJoinAttr.db + " ON " + vm.firstJoinAttr.db + "." + vm.firstJoinAttr.attry + "=" + vm.secondJoinAttr.db + "." + vm.secondJoinAttr.attry;
                $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.joinStatement;
                $scope.dbAsString = $scope.joinStatement;
            }
        };
        $scope.autoJoinCheckFunction = function() {
            var vm = this;
            $scope.autoJoinMsg = "";
            if (vm.autoJoinCheck == true) {
                $scope.commonCol = "";
                angular.forEach($scope.optionalAttribute, function(value) {
                    angular.forEach($scope.optionalAttribute, function(value1) {
                        if (value.db != value1.db && value.attry == value1.attry) {
                            if ($scope.commonCol == value1.attry) {}
                            $scope.commonCol = value1.attry;
                        }
                    });
                });
                if ($scope.commonCol != "") {
                    $scope.joinStatement = $scope.selectedDb[0] + " INNER JOIN " + $scope.selectedDb[1] + " ON " + $scope.selectedDb[0] + "." + $scope.commonCol + "=" + $scope.selectedDb[1] + "." + $scope.commonCol;
                    $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.joinStatement;
                    $scope.dbAsString = $scope.joinStatement;
                    $scope.autoJoinMsg = "";
                } else {
                    $scope.QueryObject = "select row_number() over() as rownum";
                    $scope.autoJoinMsg = "No matching columns";
                }
            } else {
                $scope.QueryObject = "select row_number() over() as rownum";
            }
        };
        $scope.changeInWhereAttr = function(item) {
            $scope.queryBuilderValidation = "";
            $scope.whereArray[(item * 4)] = $scope.selectedWhereAttrArray[item].attry;
            $scope.makeString();
            switch ($scope.datatype[$scope.selectedWhereAttrArray[item].attry]) {
                case "text":
                case "character varying":
                    $scope.typeOffiels[item] = "text";
                    break;
                case 'numeric':
                case 'bigint':
                case 'double precision':
                case 'integer':
                    $scope.typeOffiels[item] = "number";
                    break;
                case 'timestamp without time zone':
                    $scope.typeOffiels[item] = "date";
                    break;
                case 'boolean':
                    $scope.typeOffiels[item] = "checkbox";
                    break;
                default:

            }
        };

        $scope.changeInCondition = function(item) {
            $scope.queryBuilderValidation = "";
            $scope.whereArray[(item * 4) + 1] = $scope.selectedCondition[item];
            $scope.makeString();
        };

        $scope.showChartParameters = function() {
            $scope.hideAndShow(0);
        };
        $scope.hideAndShow = function(item) {
            if (item == 0) {
                $scope.showDiv1 = true;
                $scope.showDiv2 = false;
            } else {
                $scope.showDiv1 = false;
                $scope.showDiv2 = true;
            }
        };
        $scope.changeInValue = function(item) {
            $scope.queryBuilderValidation = "";
            $scope.whereArray[(item * 4) + 2] = $scope.conditionValue[item];
            $scope.makeString();
        }
        $scope.addWhereClause = function() {
            $scope.queryBuilderValidation = "";
            whereCount++;
            $scope.buttonname;
            var myEl = angular.element(document.querySelector('#connectorDiv'));
            myEl.append($compile('<div id="where' + whereCount + '" class="AndOrDiv"><div class="col-md-4" ><div class="col-md-4"><button id="connector{{b.label}}' + whereCount + '" ng-click="toggleConnectors(' + whereCount + ')" name="' + $scope.buttonname + '" class="connectorBtn" ng-class="{on:b.state}" ng-repeat="b in connectors">{{b.label}}</button></div><div class="col-md-8"><select ng-model="selectedWhereAttrArray[' + whereCount + ']" ng-change="changeInWhereAttr(' + whereCount + ')" ng-options="value.attry for value in selectedAttribute" class="form-control"></select></div></div><div class="col-md-4"><select ng-model="selectedCondition[' + whereCount + ']" ng-change="changeInCondition(' + whereCount + ')" ng-options="value for value in conditions" class="form-control"></select></div><div class="col-md-4"><div class="col-md-6"><input type="{{typeOffiels[' + whereCount + ']}}" ng-change="changeInValue(' + whereCount + ')" ng-model="conditionValue[' + whereCount + ']" class="form-control"></div><div class="col-md-6"><div class="divP1"><a href="#" class="btn btn-info btn-lg" ng-click="removeWhereClause(' + whereCount + ')" id="closebutton"><span class="glyphicon glyphicon-remove icon-colour"></span></a></div></div></div></div>')($scope));
            $scope.typeOffiels[whereCount] = "text";
            $scope.selectedWhereAttrArray[whereCount] = { "db": "", "attry": "1" };
            $scope.conditionValue[whereCount] = "1";
            $scope.selectedCondition[whereCount] = "=";
            $scope.whereArray[(whereCount * 4) - 1] = "AND";
            $scope.whereArray[(whereCount * 4)] = $scope.selectedWhereAttrArray[whereCount].attry;
            $scope.whereArray[(whereCount * 4) + 1] = $scope.selectedCondition[whereCount];
            $scope.whereArray[(whereCount * 4) + 2] = $scope.conditionValue[whereCount];
            $scope.makeString();
        }
        $scope.removeWhereClause = function(item) {
            var removeWhere = document.getElementById('where' + item);
            removeWhere.remove(removeWhere);
            whereCount--;
            $scope.basePossition = item * 4;
            $scope.whereArray[$scope.basePossition - 1] = null;
            $scope.whereArray[$scope.basePossition] = null;
            $scope.whereArray[$scope.basePossition + 1] = null;
            $scope.whereArray[$scope.basePossition + 2] = null;
            $scope.makeString();
        }
        $scope.makeString = function() {
                var index = 0;
                angular.forEach($scope.whereArray, function(value, key) {
                    if (value != null) {
                        if (key == 0) {
                            $scope.whereAsString = value;
                            if ($scope.datatype[value] == "timestamp without time zone" || $scope.datatype[value] == "character varying" || $scope.datatype[value] == "text") {
                                index = key + 2;
                            } else {}
                        } else {
                            if ($scope.datatype[value] == "timestamp without time zone" || $scope.datatype[value] == "character varying" || $scope.datatype[value] == "text") {
                                index = key + 2;
                            } else {}
                            if (index == key) {
                                $scope.whereAsString = $scope.whereAsString + " '" + value + "'";
                            } else {
                                $scope.whereAsString = $scope.whereAsString + " " + value;
                            }
                        }
                    }
                });
                $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.dbAsString + " where " + $scope.whereAsString;
            }
            /*$( "#remove"+index ).click(function() {
            	var id = $(this).attr('id');$timeout(function(){$scope.initFuntion();}, 100);
            	$().slideUp();
            });
            */
        $scope.qNamePlace = "Query Name";
        $scope.queryBuilderValidation = "";
        $scope.saveAndexecuteQuery = function() {
            $scope.queryBuilderValidation = "";

            if ($scope.QueryObject.match("where")) {} else {
                $scope.QueryObject = $scope.QueryObject + " where " + $scope.whereAsString;
            }
            if ($scope.QueryName == "") {
                $scope.qNamePlace = "Please Enter Query Name";
                document.getElementById("query").className += " formInvalid";
            }
            /*
                else if($scope.selectedSchema==undefined || $scope.selectedAttribute=="" || $scope.selectedDb=="")
                    {
                    $scope.queryBuilderValidation="Please be sure you selected all mandatory fields";
                }*/
            else {
                document.getElementById("connection-loading").style.display = 'block';
                document.getElementById("loadingDiv").style.display = 'block';
                console.log($scope.QueryObject);
                DbService.loadingData($scope.QueryObject, $scope.QueryId, $scope.QueryName)
                    .then(function(response) {
                        document.getElementById("connection-loading").style.display = 'none';
                        document.getElementById("loadingDiv").style.display = 'none';
                        var responseTableData = response;
                        $scope.records = responseTableData;
                        var i = 0;
                        $scope.result = [];
                        $scope.header = [];
                        angular.forEach($scope.records, function(value, key) {
                            angular.forEach(value, function(value1, key) {
                                angular.forEach(value1, function(value2, key) {
                                    $scope.result.push(value2);
                                    var count = Object.keys(value2).length;
                                    while (i < count) {
                                        angular.forEach(value2, function(value3, key) {
                                            $scope.header.push(key);
                                            i++;
                                        });
                                    }
                                });
                            });
                        });
                        $scope.initQueryLoading();
                    }, function(error) {
                        console.log("error in loading data function: " + error.status);
                    });
            }
        };

        $scope.executeQuery = function() {
            $scope.queryBuilderValidation = "";
            if ($scope.QueryObject.match("where")) {} else {
                $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.dbAsString + " where " + $scope.whereAsString;
            }
            if ($scope.QueryName == "") {
                $scope.qNamePlace = "Please Enter Query Name";
                document.getElementById("query").className += " formInvalid";
            }
            /*
                else if($scope.selectedSchema==undefined || $scope.selectedAttribute=="" || $scope.selectedDb=="")
                    {
                    $scope.queryBuilderValidation="Please be sure you selected all mandatory fields";
                }*/
            else {
                document.getElementById("connection-loading").style.display = 'block';
                document.getElementById("loadingDiv").style.display = 'block';
                console.log($scope.QueryObject);
                DbService.loadingData($scope.QueryObject, $scope.QueryId, $scope.QueryName + "^%q6389476625bn423454n2ghf34gy")
                    .then(function(response) {
                        document.getElementById("connection-loading").style.display = 'none';
                        document.getElementById("loadingDiv").style.display = 'none';
                        var responseTableData = response;
                        $scope.records = responseTableData;
                        var i = 0;
                        $scope.result = [];
                        $scope.header = [];
                        angular.forEach($scope.records, function(value, key) {
                            angular.forEach(value, function(value1, key) {
                                angular.forEach(value1, function(value2, key) {
                                    $scope.result.push(value2);
                                    var count = Object.keys(value2).length;
                                    while (i < count) {
                                        angular.forEach(value2, function(value3, key) {
                                            $scope.header.push(key);
                                            i++;
                                        });
                                    }
                                });
                            });
                        });

                    }, function(error) {
                        console.log("error in loading data function: " + error.status);
                    });
            }
        };




        $scope.QueryObject = "select row_number() over() as rownum," + $scope.attrAsString + " from " + $scope.dbAsString;

        $scope.initQueryLoading = function() {
            DbService.getQueryDetails()
                .then(function(queryData) {
                    $scope.Queries = queryData.allQuery;
                    DbService.getConnectionName()
                        .then(function(con_name) {
                            $scope.connection_Nm = con_name.conName;
                        }, function(error) {
                            console.log("failure");
                        });
                }, function(error) {
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
        $scope.getQueryName = function(value) {
            $scope.records = null;
            $scope.queryName = value.query_name;
            $scope.QueryName = $scope.queryName;
            $scope.QueryObject = value.query;
            $scope.QueryId = value.query_id;
            if (value.reports_per_query != "")
                $scope.Reports = value.reports_per_query.split(',');
        };
        $scope.newChartInit = 0;
        $scope.showNewChart = function() {
            if ($scope.newChartInit == 0) {
                $scope.newChartInit++;
                $scope.Reports.push("new report");
            }
        };
        $scope.clearQuery = function() {
            $scope.records = null;
            $scope.QueryName = "";
            $scope.QueryObject = "";
            $scope.QueryId = 0;
        };

        //_______________________________________________

        $scope.checkQueryName = function(QueryName) {
            angular.forEach($scope.Queries, function(value) {
                if (value.query_name === QueryName) {
                    console.log(".." + value.query_name + "...." + QueryName);
                    $scope.nameCheck = true;
                    return;
                    console.log("nameCheck" + $scope.nameCheck);
                    /*document.getElementById("nameAlert").style.display='block';
                    $timeout(function () { document.getElementById("nameAlert").style.display='none'; }, 1000);*/
                }

            });

        };
        $scope.navigateToChart = function() {
            $scope.selection1 = 'link2';
        };
        //_____________________________________________________


        $scope.displayChartFromReport = function(reportName) {
            DbService.getChartFromReport(reportName)
                .then(function(chartData) {
                    //$scope.hideAndShow(1);
                    $scope.chartdata = JSON.stringify(chartData.mainJSON);
                    $scope.chartdrilldata = JSON.stringify(chartData.drillDownModel);
                    $scope.reportName = JSON.stringify(chartData.reportName);
                    $scope.type = JSON.stringify(chartData.chartType);

                    $("#main-chart-div").append("<div class='right-side-chart' id='right-side-chart-div'><bar-chart class='span12' type='" + chartData.chartType + "' divid='container2' width=350 height=220 title='' subtitle='Click the columns to view versions.' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart></div>");

                }, function(error) {
                    console.log("failure on chart rendering");
                });

        };




        /*--------------------------------------------------------New Code---------------------------------------------*/
        //$scope.dbObject1={"public":{"flat":{"no_of_members":"numeric","flat_name":"character varying"},"buildings":{"building_name":"character varying","building_population":"numeric","no_of_flats":"numeric"},"pg_stat_statements":{"local_blks_read":"bigint","temp_blks_read":"bigint","shared_blks_dirtied":"bigint","query":"text","shared_blks_hit":"bigint","local_blks_written":"bigint","blk_write_time":"double precision","local_blks_dirtied":"bigint","blk_read_time":"double precision","rows":"bigint","userid":"oid","queryid":"bigint","local_blks_hit":"bigint","temp_blks_written":"bigint","calls":"bigint","dbid":"oid","shared_blks_read":"bigint","total_time":"double precision","shared_blks_written":"bigint"},"room_availability":{"plot":"character varying","avail_rooms":"numeric"},"mega_polis":{"plot":"character varying","no_of_buildings":"numeric","mega_polis_population":"numeric"}},"publi":{"fla":{"no_of_member":"numeric","flat_name":"character varying"},"building":{"building_ame":"character varying","building_population":"numeric","no_of_flats":"numeric"},"pg_stat":{"local_blks_read":"bigint","temp_blks_read":"bigint","shared_blks_dirtied":"bigint","query":"text","shared_blks_hit":"bigint","local_blks_written":"bigint","blk_write_time":"double precision","local_blks_dirtied":"bigint","blk_read_time":"double precision","rows":"bigint","userid":"oid","queryid":"bigint","local_blks_hit":"bigint","temp_blks_written":"bigint","calls":"bigint","dbid":"oid","shared_blks_read":"bigint","total_time":"double precision","shared_blks_written":"bigint"},"room_availablity":{"plot":"character varying","avail_rooms":"numeric"},"mega_pois":{"plot":"character varying","no_of_buildings":"numeric","mega_polis_population":"numeric"}}};
        $scope.initFuntion = function() {
            $.fn.extend({
                treeview: function() {
                    return this.each(function() {
                        // Initialize the top levels;
                        var tree = $(this);

                        tree.addClass('treeview-tree');
                        tree.find('li').each(function() {
                            var stick = $(this);
                        });
                        tree.find('li').has("ul").each(function() {
                            var branch = $(this); //li with children ul
                            branch.prepend("<i class='tree-indicator glyphicon glyphicon-chevron-right'></i>");
                            branch.addClass('tree-branch');
                            branch.on('click', function(e) {
                                if (this == e.target) {
                                    var icon = $(this).children('i:first');

                                    icon.toggleClass("glyphicon-chevron-down glyphicon-chevron-right");
                                    $(this).children().children().toggle();
                                }
                            })
                            branch.children().children().toggle();

                            /**
                             *	The following snippet of code enables the treeview to
                             *	function when a button, indicator or anchor is clicked.
                             *
                             *	It also prevents the default function of an anchor and
                             *	a button from firing.
                             */
                            branch.children('.tree-indicator, button, a').click(function(e) {
                                branch.click();

                                e.preventDefault();
                            });
                        });
                    });
                }
            });

            /**
             *	The following snippet of code automatically converst
             *	any '.treeview' DOM elements into a treeview component.
             */


            $('.treeview').each(function() {
                var tree = $(this);
                tree.treeview();
            })
        };
        $scope.changeInDb1 = function(item) {
            var vm = this;
            $scope.tables = []
            $scope.attrList = [];
            $scope.allTables = vm.databaseName;
            angular.forEach($scope.allTables, function(value, key) {
                $scope.tables.push(key);
                angular.forEach(value, function(value1, key1) {
                    $scope.attrList.push({ 'table': key, 'attributes': key1, 'datatype': value1 });
                });
            });
            $scope.dragInit();
        };
        $scope.tables = [];
        $scope.attrList = [];

        /*--------------------------------------------------------------------------------------------------------------------*/







        $scope.deleteQueryName = function(item) {
            $("#deleteQueryDiv" + item).slideUp();
        };
        $scope.queryToBeDeleted = 0;
        $scope.delete_Query_Confirmation = function(item) {
            $scope.queryToBeDeleted = item;
        };

        $scope.delete_query1 = function(item) {

            DbService.deleteQuery(item)
                .then(function(response) {
                    $("#deleteQueryDiv" + item).slideUp();
                }, function(error) {
                    console.log("error in loading data function: " + error.status);
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
        $scope.chartToBeDeleted = 0;
        $scope.delete_ChartReport_Confirmation = function(item) {
            $scope.chartToBeDeleted = item;
        };




        $scope.delete_chart1 = function(item) {

            DbService.deleteChartReport(item)
                .then(function(response) {
                    $("#deleteChartDiv" + item).slideUp();
                }, function(error) {
                    console.log("error in loading data function: " + error.status);
                });

        };
        $scope.delete_ChartReport = function(report_Name) {
            $("#deleteChartDiv" + report_Name).slideUp();
        };

        /*$scope.delete_ChartReport_Confirmation = function(report_Name){

        	$( "#deleteButton2").click(function() {
        			DbService.deleteChartReport(report_Name)
        			.then(function(response){
        				$( "#deleteChartDiv"+report_Name).slideUp();
        				//alert("Chart Deleted Successfully!");
        			},function(error){
        				console.log("error in loading data function: "+error.status);
        			});
        	});
        };*/

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

        $scope.QueryId = 0;
        $scope.QueryName = "";
        //start of chart geneartion. . . . .
        $scope.charttitle = "";
        $scope.chartdata = "";
        $scope.chartdrilldata = "";


        $scope.parameters = {};



        $scope.viewTableService = function() {
            DbService.viewTable()
                .then(function(tables) {
                        $scope.records = tables;
                        var i = 0;

                        $scope.result = [];
                        $scope.header = [];
                        angular.forEach($scope.records, function(value, key) {
                            angular.forEach(value, function(value1, key) {
                                angular.forEach(value1, function(value2, key) {
                                    $scope.result.push(value2);
                                    var count = Object.keys(value2).length;
                                    while (i < count) {
                                        angular.forEach(value2, function(value3, key) {
                                            $scope.header.push(key);
                                            i++;
                                        });
                                    }
                                });
                            });
                        });
                    },
                    function(error) {
                        console.log("Failure");
                    });
        };


        $scope.YValues = [];
        $scope.XValues = [];
        $scope.getParameters = function() {
            DbService.chartColumnDataFunction()
                .then(function(response) {
                    for (var key in response) {
                        $scope.parameters = response[key];
                    }

                    angular.forEach($scope.parameters, function(key, value) {
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

                }, function(error) {
                    console.log("Failure");
                });
        };
        //$scope.chartsTypes={"types":["pie","line","column"]};
        // $scope.chartType1="";$scope.ct="";
        //$scope.changeInType=function(){alert($scope.ct);};
        var index = 0;
        var x = 10;


        //$("#ok_button").click(function () {
        $scope.generateChart = function() {
            var xaxis = $("#sel1").val();
            var yaxis = $("#sel2").val();
            var drilldown = $("#sel4").val();
            var chartType = $("#sel3").val();
            DbService.getChartData(xaxis, yaxis, drilldown, chartType)
                .then(function(chartData) {
                    console.log(chartData);
                    $scope.chart_Data = chartData;
                    $scope.chartdata = JSON.stringify(chartData.mainJSON);
                    $scope.chartdrilldata = JSON.stringify(chartData.drillDownModel);
                    var reportName = chartData.reportName;
                    index++;
                    var node = document.createElement("div");
                    node.setAttribute('id', 'chart-rend-space-' + index);
                    node.setAttribute('class', 'span6 chart chart_color');
                    $scope.chartType = document.getElementById("sel3").value;
                    document.getElementById("main-chart-div").appendChild(node);

                    $scope.savingStatus = "Saving...";
                    $scope.saveFlag = false;
                    $("#chart-rend-space-" + index).append("<div class='form-group' id='drag'><bar-chart id='Brands' class='span12' type='" + $scope.chartType + "' title='' divid='container" + index + "' subtitle='' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart><div><span class='glyphicon glyphicon-remove-circle' id='remove" + index + "'></span><span class='glyphicon glyphicon-floppy-save' id='save" + index + "' data-toggle='modal' data-target='#saveModal'></span></div></div>");
                    /*$("#chart-rend-space-" + index).append("<div class='form-group' id='drag'><bar-chart id='Brands' class='span12' type='"+$scope.chartType+"' title='' divid='container" + index + "' subtitle='' data='" + $scope.chartdata + "' drilldowndata='" + $scope.chartdrilldata + "'></bar-chart><div><iron-icon icon='icons:delete' id='remove"+index+"'></iron-icon></div><div>
<iron-icon icon='icons:cloud-download' id='save"+index"'></iron-icon></div></div>");*/
                    /*var draggie = new Draggabilly('#chart-rend-space-' + index, {
       		containment: 'body'
        	});*/
                    $("#remove" + index).click(function() {
                        var id = $(this).attr('id');
                        $("#chart-rend-space-" + id[6]).slideUp();
                    });
                    $("#save" + index).click(function() {

                        if ($scope.saveFlag == false) {
                            DbService.getSavedChartReport($scope.chart_Data)
                                .then(function(response) {
                                    $scope.savingStatus = "Saved";
                                    $scope.saveFlag = true;
                                    DbService.getQueryDetails()
                                        .then(function(queryData) {
                                            angular.forEach(queryData.allQuery, function(value) {
                                                if (value.query_name == $scope.queryName) {
                                                    $scope.getQueryName(value);
                                                }
                                            });
                                        }, function(error) {});

                                }, function(error) {
                                    alert("Saving...Failure" + error.status);
                                    $scope.savingStatus = "Failed";
                                });
                        } else
                            $scope.savingStatus = "Chart is already Saved!";
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