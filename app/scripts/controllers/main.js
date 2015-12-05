'use strict';

/*
 * @ngdoc function
 * @name statscalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statscalcApp
 */

angular.module('statscalcApp')
  .controller('MainCtrl', function ($scope) {

  	$scope.debugBtn = function() {
    	console.log($scope.inputs0);
    	console.log($scope.inputs1);
    };

  	var i;
    $scope.inputs0 = [];
    $scope.inputs1 = [];
    $scope.cntInputs = 1;
    
    $scope.addRow=function(){
	    var a = [];

	    for(i=0; i <= $scope.cntInputs; i++) {
			a.push(i);
	    }
	    return a;	    
	};

	$scope.addfield = function() {
    	$scope.cntInputs += 1;
    };


});
