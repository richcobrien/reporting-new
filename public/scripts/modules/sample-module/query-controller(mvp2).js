define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

controllers.controller('queryModellerCtrl',['$scope', 'DbService', '$state', function($scope, DbService, $state){
    //document.querySelector('px-app-nav').markSelected('/querymodular');

    $scope.executeQuery = function(){
        alert("Execute Query");
    };
alert("inside controller");
console.log("inside controller");
$scope.dbObject=response.data;
alert("got response"+response.data);
$scope.dataBaseList = document.getElementById('data-base-list');
$scope.tableList = document.getElementById('ripos');
$scope.attrList = document.getElementById('show-me');
$scope.conditionAttrList = document.getElementById('condition-attr');
var whereIndex=0;



for($scope.dbs in $scope.dbObject)
{
	var opt = document.createElement('option');
	opt.value = $scope.dbs;
	opt.innerHTML = $scope.dbs;
	$scope.dataBaseList.appendChild(opt);
}


//selecting db and listing out the corresponding tables
$scope.selectDb = function ()
{
         //$scope.tableList={};
	//$scope.dbName=$scope.dataBaseList.value;
       // console.log($scope.dbName);
             if($scope.tableList.hasChildNodes())
        {
		while ($scope.tableList.firstChild) 
                {
			$scope.tableList.removeChild($scope.tableList.firstChild);
		}
	}
		for($scope.tables in $scope.dbObject[$scope.dbName])
       {
		var opt = document.createElement('option');
		opt.value = $scope.tables;
		opt.innerHTML = $scope.tables;
		$scope.tableList.appendChild(opt);
        }
}



//selecting the table and listing out the correponding attributes
$scope.selectTable = function (){

	 var dataBase = $scope.dataBaseList.value;
	
	if($scope.attrList.hasChildNodes()){
		while ($scope.conditionAttrList.firstChild) {
			if($scope.conditionAttrList.hasChildNodes())
			$scope.conditionAttrList.removeChild($scope.conditionAttrList.firstChild);
			if($scope.attrList.hasChildNodes())
			$scope.attrList.removeChild($scope.attrList.firstChild);
		}
	}
	for ($scope.tb=0;$scope.tb<getQueryForm.ripos.options.length;$scope.tb++){
console.log(dataBase);
		if (getQueryForm.ripos.options[$scope.tb].selected){

			for($scope.attrs in $scope.dbObject[dataBase][getQueryForm.ripos.options[$scope.tb].text]){
				var opt3 = document.createElement('option');
				var opt1 = document.createElement('option');
				opt3.value = $scope.dbObject[dataBase][getQueryForm.ripos.options[$scope.tb].text][$scope.attrs];
				opt1.value = $scope.dbObject[dataBase][getQueryForm.ripos.options[$scope.tb].text][$scope.attrs];
				opt3.innerHTML = $scope.attrs;
				opt1.innerHTML = $scope.attrs;
				opt3.setAttribute('tab_name', getQueryForm.ripos.options[$scope.tb].value);
				opt1.setAttribute('tab_name', getQueryForm.ripos.options[$scope.tb].value);
				$scope.attrList.appendChild(opt3);
				$scope.conditionAttrList.appendChild(opt1);
       
			}
		}
	}
}



/*************************************start of query generaton************************************************************/
$scope.generateQuery = function(){

	//variable declerations
	var error=0;
	$scope.queryObject={
		"table": tableStringMolder(getQueryForm.ripos.options, document.getElementById('data-base-list').value),
		"attribute": attributeStringMolder(getQueryForm.showMe.options),/*
		"condition": $scope.attributeStringMolder(getQueryForm.conditionAttr.options),
		"operator": querySubStringSingleSelection("operation"),
		"inputCondition": $scope.quatationValid()+document.getElementById("condition-value").value+$scope.quatationValid(),*/
		"query":function(){
				return "SELECT row_number() over() as rownum,"+$scope.queryObject.attribute+" FROM "+$scope.queryObject.table+" WHERE "+whereClauseString();//this.condition+" "+this.operator+" "+this.inputCondition;
			}
	};

//sub string in sql from multi selection box

		function attributeStringMolder(data_long){
			var tempString="";
			for(var index=0; index<data_long.length;index++){
				if(data_long[index].selected){
					tempString = tempString + data_long[index].getAttribute('tab_name')+"."+data_long[index].text+",";
				}
			}
				tempString = tempString+"/";
				tempString = tempString.split(",/",1);
				return tempString;
		}
	
		 function tableStringMolder(data_long, db){
			var tempString="";
			for (var index=0;index<data_long.length;index++){
				if(data_long[index].selected){
					tempString = tempString + db+"."+data_long[index].value+",";
				}
			}
		tempString = tempString+"/";
		tempString = tempString.split(",/",1);
		return tempString;
		}
//sub string in sql from single selection box
	function querySubStringSingleSelection (select_id){
		$scope.e = document.getElementById(select_id);
		return  $scope.e.options[$scope.e.selectedIndex].text;
	}
	document.getElementById("OutputQuery").value = $scope.queryObject.query();
}
	function quatationValid (windex){
		var cond = document.getElementById('condition-attr'+windex).value;
		if(cond.localeCompare('text')==0 || cond.localeCompare('character varying')==0 || cond.localeCompare('ARRAY')==0)
			return "'";
		else if(cond.localeCompare('integer')==0 || cond.localeCompare('numeric')==0)
			return "";
		else
			return "";
	}
	
	
//condition input validator
/*
	 function validateInput(){
		var cond = document.getElementById('condition-attr').value;
		var condInp = document.getElementById('condition-value');
		if(cond.localeCompare('text')==0 || cond.localeCompare('character varying')==0 || cond.localeCompare('ARRAY')==0){
			condInp.setAttribute('type', 'text');
		}
		if(cond.localeCompare('integer')==0 || cond.localeCompare('numeric')==0){
			condInp.setAttribute('type', 'number');
		}
		if(cond.localeCompare('date')==0){
			condInp.setAttribute('type', 'date');
		}
	}
*/
	 $scope.validateInput= function(){
		var cond = document.getElementById('condition-attr').value;
		var condInp = document.getElementById('condition-value');
		if(cond.localeCompare('text')==0 || cond.localeCompare('character varying')==0 || cond.localeCompare('ARRAY')==0){
			condInp.setAttribute('type', 'text');
		}
		if(cond.localeCompare('integer')==0 || cond.localeCompare('numeric')==0){
			condInp.setAttribute('type', 'number');
		}
		if(cond.localeCompare('date')==0){
			condInp.setAttribute('type', 'date');
		}
	}
	$scope.newWhere = function (){
		
		if(!$scope.conditionAttrList.hasChildNodes()){}
		else{
			whereIndex++;
			var div0 = document.createElement('div');
			 var div1 = document.createElement('div');
			 var div2 = document.createElement('div');
			 var div3 = document.createElement('div');
			
			 div0.className = 'span11';
			 div1.className = 'span4';
			 div2.className = 'span3';
			 div3.className = 'span4';
			
			
			 div0.innerHTML="<select id='assign"+whereIndex+"' required><option value='AND'>AND</option><option value='OR'>OR</option></select>";

			div1.innerHTML="<select name='conditionAttr"+whereIndex+"' id='condition-attr"+whereIndex+"' required></select>";

			div2.innerHTML="<select name='operation"+whereIndex+"' id='operation"+whereIndex+"' required><option value='='>=</option><option value='>'>></option><option value='<'><</option><option value='!='>!=</option><option value='<='><=</option><option value='>='>>=</option><option value='LIKE'>LIKE</option></select>";
			div3.innerHTML="<input type='text' id='condition-value"+whereIndex+"' required/>";
			
			document.getElementById("where0").appendChild(div0);
			document.getElementById("where0").appendChild(div1);
			document.getElementById("where0").appendChild(div2);
			document.getElementById("where0").appendChild(div3);
//$("#condition-attr"+whereIndex+"").attr("onchange",validateInputMore());
			addAttrCondition(document.getElementById('condition-attr'+whereIndex));
			
			}
			
		}
		
	function addAttrCondition(selecter){

		for ($scope.tb=0;$scope.tb<getQueryForm.ripos.options.length;$scope.tb++){
			if (getQueryForm.ripos.options[$scope.tb].selected){
				for($scope.attrs in $scope.dbObject[$scope.dataBaseList.value][getQueryForm.ripos.options[$scope.tb].text]){
					var opt1 = document.createElement('option');
					opt1.value = $scope.dbObject[$scope.dataBaseList.value][getQueryForm.ripos.options[$scope.tb].text][$scope.attrs];
					opt1.innerHTML =$scope.attrs;
					opt1.setAttribute('tab_name', getQueryForm.ripos.options[$scope.tb].value);
					selecter.appendChild(opt1);
				}
			}
		}
	}



	function validateInputMore(){

		cond = document.getElementById('condition-attr'+whereIndex).value;
		var condInp = document.getElementById('condition-value'+whereIndex);

		if(cond.localeCompare('text')==0 || cond.localeCompare('character varying')==0 || cond.localeCompare('ARRAY')==0){
			condInp.setAttribute('type', 'text');
		}
		if(cond.localeCompare('integer')==0 || cond.localeCompare('numeric')==0){
			condInp.setAttribute('type', 'number');
		}
		if(cond.localeCompare('date')==0){
			condInp.setAttribute('type', 'date');
		}
	}
	
	function whereClauseString(){
		var tempString="",index=0;
		do {
			if(index==0){
        		tempString+=document.getElementById('condition-attr').options[document.getElementById('condition-attr').selectedIndex].text+" "+document.getElementById('operation').options[document.getElementById('operation').selectedIndex].text+" "+quatationValid('')+document.getElementById('condition-value').value+quatationValid('');
			}
			else{
				tempString+=" "+document.getElementById('assign'+index).options[document.getElementById('assign'+index).selectedIndex].text+" "+document.getElementById('condition-attr'+index).options[document.getElementById('condition-attr'+index).selectedIndex].text+" "+document.getElementById('operation'+index).options[document.getElementById('operation'+index).selectedIndex].text+" "+quatationValid(index)+document.getElementById('condition-value'+index).value+quatationValid(index);
			}
			index++;
    }
    while (index <= whereIndex);
    return tempString;
	}
  

}]);
});
