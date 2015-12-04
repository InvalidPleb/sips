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

  	var i;
    $scope.inputs = [];

    $scope.addfield = function() {

    	$scope.cntInputs += 1;

    //	for (i=1; i <= 10; i++) {
    //		$scope.inputs.push(i);
    //	}
 
    };

    $scope.debugBtn = function() {
    	
    	console.log($scope.inputs);
    };

    $scope.cntInputs = 1;
    
    
    $scope.getTimes=function(){
	    var a = [];

	    for(i=1; i <= $scope.cntInputs; i++) {
			a.push(i);
	    }

	    return a;	    
	};
    
    $scope.getValue = function(){
        //here get the value of that inserted in the element with the id of "input_" + id
        return $scope.inputs[-1];
    };






});
