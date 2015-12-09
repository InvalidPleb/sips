'use strict';

/*
 * @ngdoc function
 * @name statscalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statscalcApp
 */

angular.module('statscalcApp')
  .controller('MainCtrl', function ($scope, $parse) {

  	$scope.debugBtn = function() {
    	console.log($scope.cells);
    };

    var countColumns = 0;
    var countRows = 0;

	$scope.addRow = function() {
    	$scope.rows.push($scope.rows.length + 1);
    	countRows += 1;

    };

    $scope.addCol = function(){
    	$scope.columns.push('var' + ($scope.columns.length + 1));
    	/*
    	$('.tableBody').css({
    		"margin-left":"-=39px" 
    	});
		*/
    	countColumns += 1;

    	if (countColumns > 1) {

    	}

    };

    $scope.columns = ['var1'];
  	$scope.rows = [];
  	$scope.cells = {};


  	var i;
  	var numRows = 15;
  	var numCols = 10;

  	for (i=1; i <= numRows; i++) {
  		$scope.rows.push(i);
  	}

  	for (i=2; i <= numCols; i++) {
  		$scope.columns.push('var' + i);
  	}
  	
  	$scope.compute = function(cell) {
      return $parse($scope.cells[cell])($scope);
  	};

  	$scope.clearBtn = function() {

  		for (i=15; i < $scope.rows.length; i++) {
	  		if (i >= 15) {
	  			$scope.rows.splice(i);
	  		}
  		}

  		for (i=10; i < $scope.columns.length; i++) {
	  		if (i >= 10) {
	  			$scope.columns.splice(i);
	  		}
  		}
  	};

  	$scope.setTable = function() {

  		console.log($scope.inputRows);
  		console.log($scope.inputCols);

  		if ($scope.inputRows !== '' && $scope.inputRows !== undefined && $scope.inputRows !== 0) {
  			numRows = $scope.inputRows;
  		}

  		if ($scope.inputCols !== '' && $scope.inputCols !== undefined && $scope.inputRows !== 0) {
  			
  		}

  		numRows = 15;
  		numCols = 10;

  	};


});
