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
    };

  	var i;
  	var j;
    $scope.inputs0 = [];
    $scope.inputs1 = [];
    $scope.inputs2 = [];
    $scope.cntInputs = 10;
    
    $scope.addRow=function(){
	    var a = [];

	    for(i=0; i <= $scope.cntInputs; i++) {
			a.push(i);
	    }
	    return a;	    
	};

	$scope.addCol=function(){
	    var b = [];

	    for(j=0; j <= $scope.cntInputs; j++) {
			b.push(j);
	    }
	    return b;	    
	};

	$scope.addfield = function() {
    	$scope.cntInputs += 1;
    };


    $scope.columns = ['A', 'B', 'C', 'D'];
  	$scope.rows = [1, 2, 3, 4];
  	$scope.cells = {};
  	
  	$scope.compute = function(cell) {
      return $parse($scope.cells[cell])($scope);
  	};

    

});
