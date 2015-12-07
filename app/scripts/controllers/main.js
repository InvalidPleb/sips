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
    	console.log($scope.inputs0);
    	console.log($scope.inputs1);
    	console.log($scope.cells);
    };

	$scope.addRow = function() {
    	$scope.rows.push($scope.rows.length + 1);

    };

    $scope.addCol = function(){
    	$scope.columns.push('var' + ($scope.columns.length + 1));
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


});
