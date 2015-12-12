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
  	var j;
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

  		numRows = parseInt($scope.rows.length);
  		numCols = parseInt($scope.columns.length);

  		if ($scope.rows.length >= 15) {

	  		for (i=15; i <= $scope.rows.length; i++) {
		  		
		  		$scope.rows.splice(i);
	  		}

  		} else {

  			for (i = ($scope.rows.length + 1); i <= 15; i++) {

  				$scope.rows.push(i);
  			}

  		}

  		if ($scope.columns.length >= 10) {

	  		for (i=10; i < $scope.columns.length; i++) {
		  		
		  		$scope.columns.splice(i);
	  		} 

  		} else {

  			for (i = ($scope.columns.length + 1); i <= 10; i++) {

  				$scope.columns.push('var' + i);
  			}
  		}

  		$scope.inputRows = '';
  		$scope.inputCols = '';
  	};

  	/* need to update for single additions w/ button push */

  	$scope.updateInputRows = function() {

  		numRows = parseInt($scope.rows.length);
  	};

  	$scope.updateInputCols = function() {

  		numCols = parseInt($scope.columns.length);
  	};



  	var pushRows = 0;
  	var pushCols = 0;
  	
  	$scope.setTable = function() {

  		if ($scope.inputRows !== '' && $scope.inputRows !== undefined && $scope.inputRows !== 0) {

  			if ($scope.inputRows > $scope.rows.length) {

	  			pushRows = $scope.inputRows - $scope.rows.length;
	  			for (i = ($scope.rows.length + 1); i <= (numRows + pushRows); i++) {
	  				$scope.rows.push(i);
	  			}

  			} else {

  				pushRows = $scope.inputRows;
  				for (i = ($scope.rows.length); i >= (pushRows); i--) {
	  				$scope.rows.splice(i);
	  			}

  			}
  		}

  		if ($scope.inputCols !== '' && $scope.inputCols !== undefined && $scope.inputCols !== 0) {
  			if ($scope.inputCols > $scope.columns.length) {

	  			pushCols = $scope.inputCols - $scope.columns.length;
	  			for (i = ($scope.columns.length + 1); i <= (numCols + pushCols); i++) {
	  				$scope.columns.push('var' + i);
	  			}

	  			/*

	  			for (j = 1; j <= (i - 10); j++) {
	  				
	  				$('.tableBody').css({
    					"margin-left":"-=39px" 
    				});
	  			}

	  			*/
  			} else {

  				pushCols = $scope.inputCols;
  				for (i = ($scope.columns.length); i >= (pushCols); i--) {
	  				$scope.columns.splice(i);
	  			}
  			}
  		}

  	};


});
