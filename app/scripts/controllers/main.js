'use strict';

// @ngdoc function
// @name statscalcApp.controller:MainCtrl
// @description

angular.module('statscalcApp')
  .controller('MainCtrl', function ($scope, $parse) {

  	$scope.debugBtn = function() {
  		console.log($scope.cells);
    };

	$scope.addRow = function() {
    	$scope.rows.push($scope.rows.length + 1);
    };

    $scope.addCol = function(){
    	$scope.columns.push('var' + ($scope.columns.length + 1));
    };

    $scope.deleteRow = function() {

    	if ($scope.rows.length > 1) {

    		$scope.rows.splice($scope.rows.length - 1);

    	}

    };

    $scope.deleteCol = function() {

    	if ($scope.columns.length > 1) {

    		$scope.columns.splice($scope.columns.length - 1);

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
  	
  	$scope.computeCells = function(cell) {
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

  			} else {

  				pushCols = $scope.inputCols;
  				for (i = ($scope.columns.length); i >= (pushCols); i--) {
	  				$scope.columns.splice(i);
	  			}
  			}
  		}

  	};

  	var cellsSquaredX = [];
  	var cellsSquaredY = [];
  	var cellsXY = [];
  	var cellsDiff = [];
  	var cellsDiffSquared = [];
  	var colXArr = [];
  	var colYArr = [];
  	var cellsCounterX = 0;
  	var cellsCounterY = 0;
  	var varCell = $scope.cells;
  	var colX, colY, colXSum, colYSum, cellsXYSum, cellsSquaredXSum, cellsSquaredYSum, cellsDiffSum, cellsDiffSquaredSum,
  	numberSamples, numberSamplesX, numberSamplesY, rScore, rScore1, rScore2, rScore3, rScore4, meanX, meanY, indTScore, 
  	indTScore1, indTScore2, indTScore3, indTScore4, indTScore5, indTScore6, depTScore1, depTScore, depTScore2, depTScore3, 
  	depTScore4, indDf, depDf, degreesFreedom, chosenT, confidenceLevel;


  	function add(a, b) {
    	return a + b;
	}

  	$scope.calcTTest = function () {

  		cellsCounterX = 0;
  		cellsCounterY = 0;

  		for (i=1; i <= $scope.rows.length; i++) {

  			if (isNaN(varCell['var1' + i]) === false || isNaN(varCell['var2' + i]) === false) {

  				if (isNaN(varCell['var1' + i]) === false && isNaN(varCell['var2' + i]) === true) {

  					colXArr[i] = parseFloat(varCell['var1' + i]);
  					cellsSquaredX[i] = Math.pow(varCell['var1' + i], 2);
  					cellsCounterX += 1;
  				
  				} else if (isNaN(varCell['var2' + i]) === false && isNaN(varCell['var1' + i]) === true) {

  					colYArr[i] = parseFloat(varCell['var2' + i]);
  					cellsSquaredY[i] = Math.pow(varCell['var2' + i], 2);
  					cellsCounterY += 1;
  					
  				} else if (isNaN(varCell['var1' + i]) === false && isNaN(varCell['var2' + i]) === false) {

  					colXArr[i] = parseFloat(varCell['var1' + i]);
  					colYArr[i] = parseFloat(varCell['var2' + i]);
  					cellsSquaredX[i] = Math.pow(varCell['var1' + i], 2);
  					cellsSquaredY[i] = Math.pow(varCell['var2' + i], 2);
  				    cellsDiff[i] = parseFloat(varCell['var1' + i]) - parseFloat(varCell['var2' + i]);
  				    cellsDiffSquared[i] =  Math.pow(cellsDiff[i], 2);
  					cellsXY[i] = parseFloat(varCell['var1' + i]) * parseFloat(varCell['var2' + i]);
  					cellsCounterX += 1;
  					cellsCounterY += 1;

  				}	
	    		
    		} else {

    			i = ($scope.rows.length + 1);
    		}
    	}

    	console.log(cellsDiffSquared);

    	numberSamplesX = cellsCounterX;
	   	numberSamplesY = cellsCounterY;

	   	colXSum = colXArr.reduce(add, 0);
	    colYSum = colYArr.reduce(add, 0);
	    cellsXYSum = cellsXY.reduce(add, 0);
		cellsSquaredXSum = cellsSquaredX.reduce(add, 0);
		cellsSquaredYSum = cellsSquaredY.reduce(add, 0);
		cellsDiffSum = cellsDiff.reduce(add, 0);
		cellsDiffSquaredSum = cellsDiffSquared.reduce(add, 0);

    	// need to use different n for x & y here
    	if (numberSamplesX === numberSamplesY) {

    		numberSamples = numberSamplesX;
		    rScore1 = (numberSamples * cellsXYSum) - (colXSum * colYSum);
		    rScore2 = (numberSamples * cellsSquaredXSum) - Math.pow(colXSum, 2);
		    rScore3 = (numberSamples * cellsSquaredYSum) - Math.pow(colYSum, 2);
		    rScore4 = Math.sqrt((rScore2 * rScore3));
		    rScore = rScore1 / rScore4;

    	} else {

    		console.log("r needs equal groups?");
    	}

    	// Independent t Score 
    	
	   	// different N is supposed to be used for each group, in this case we use the same N and require equal group sizes
	   	// Every time N is multiplied by 2, the actual formula requests the sum of both Ns. this is also the df
	   	
	   	meanX = colXSum / numberSamplesX;
	   	meanY = colYSum / numberSamplesY;

	   	indTScore1 = meanX - meanY;
	   	indTScore2 = cellsSquaredXSum - (Math.pow(colXSum, 2) / numberSamplesX);
	   	indTScore3 = cellsSquaredYSum - (Math.pow(colYSum, 2) / numberSamplesY);
	   	indTScore4 = (indTScore2 + indTScore3) / ((numberSamplesX + numberSamplesY) - 2);
	   	indTScore5 = (1 / numberSamplesX) + (1 / numberSamplesY);
	   	indTScore6 = Math.sqrt(indTScore4 * indTScore5);
	   	indTScore = indTScore1 / indTScore6;
	   	indDf = (numberSamplesX + numberSamplesY) - 2;


	   	// needs to be iterated for nearest df if specific df is not in table

	   	degreesFreedom = tDistributionTable['df' + indDf];
	   	

	   	for (i=1; i < degreesFreedom.length; i++) {

	   		if (degreesFreedom[i] > Math.abs(indTScore)) {

	   			chosenT = degreesFreedom[i - 1];
	   			confidenceLevel = tDistributionTable.p[i - 1];
	   			i = degreesFreedom.length;
	   				   			
	   		}

	   	}

	   	console.log(chosenT);

	   	// Dependent t Score 
	   	
	   	depTScore1 = cellsDiffSum / numberSamples;
	   	depTScore2 = cellsDiffSquaredSum - (Math.pow(cellsDiffSum, 2) / numberSamples);
	   	depTScore3 = numberSamples * (numberSamples - 1);
	   	depTScore4 = Math.sqrt(depTScore2 / depTScore3);
	   	depTScore = depTScore1 / depTScore4;
	   	depDf = numberSamples - 1;

	   	console.log(depTScore);

	   	for (i=1; i < degreesFreedom.length; i++) {

	   		if (degreesFreedom[i] > Math.abs(depTScore)) {
	   			chosenT = degreesFreedom[i - 1];
	   			confidenceLevel = tDistributionTable.p[i - 1];
	   			i = degreesFreedom.length;
	   				   			
	   		}
	   	}

	   	console.log(chosenT);



	   	
	   	

	   	
  	};



  	var tDistributionTable = {

  		p: [0.25, 0.20, 0.15, 0.10, 0.05, 0.025, 0.02, 0.01, 0.005, 0.0025, 0.001, 0.0005],
  		df1: [1.000, 1.376, 1.963, 3.078, 6.314, 12.71, 15.89, 31.82, 63.66, 127.3, 318.3, 636.6],
  		df2: [0.816, 1.061, 1.386, 1.886, 2.920, 4.303, 4.849, 6.965, 9.925, 14.09, 22.33, 31.60],
  		df3: [0.765, 0.978, 1.250, 1.638, 2.353, 3.182, 3.482, 4.541, 5.841, 7.453, 10.21, 12.92],
  		df4: [0.741, 0.941, 1.190, 1.533, 2.132, 2.776, 2.999, 3.747, 4.604, 5.598, 7.173, 8.610],
  		df5: [0.727, 0.920, 1.156, 1.476, 2.015, 2.571, 2.757, 3.365, 4.032, 4.773, 5.893, 6.869],
  		df6: [0.718, 0.906, 1.134, 1.440, 1.943, 2.447, 2.612, 3.143, 3.707, 4.317, 5.208, 5.959],
  		df7: [0.711, 0.896, 1.119, 1.415, 1.895, 2.365, 2.517, 2.998, 3.499, 4.029, 4.785, 5.408],
  		df8: [0.706, 0.889, 1.108, 1.397, 1.860, 2.306, 2.449, 2.896, 3.355, 3.833, 4.501, 5.041],
  		df9: [0.703, 0.883, 1.100, 1.383, 1.833, 2.262, 2.398, 2.821, 3.250, 3.690, 4.297, 4.781],
  		df10: [0.700, 0.879, 1.093, 1.372, 1.812, 2.228, 2.359, 2.764, 3.169, 3.581, 4.144, 4.587],
  		df11: [0.697, 0.876, 1.088, 1.363, 1.796, 2.201, 2.328, 2.718, 3.106, 3.497, 4.025, 4.437],
  		df12: [0.695, 0.873, 1.083, 1.356, 1.782, 2.179, 2.303, 2.681, 3.055, 3.428, 3.930, 4.318],
  		df13: [0.694, 0.870, 1.079, 1.350, 1.771, 2.160, 2.282, 2.650, 3.012, 3.372, 3.852, 4.221],
  		df14: [0.692, 0.868, 1.076, 1.345, 1.761, 2.145, 2.264, 2.624, 2.977, 3.326, 3.787, 4.140],
  		df15: [0.691, 0.866, 1.074, 1.341, 1.753, 2.131, 2.249, 2.602, 2.947, 3.286, 3.733, 4.073],
  		df16: [0.690, 0.865, 1.071, 1.337, 1.746, 2.120, 2.235, 2.583, 2.921, 3.252, 3.686, 4.015],
  		df17: [0.689, 0.863, 1.069, 1.333, 1.740, 2.110, 2.224, 2.567, 2.898, 3.222, 3.646, 3.965],
  		df18: [0.688, 0.862, 1.067, 1.330, 1.734, 2.101, 2.214, 2.552, 2.878, 3.197, 3.611, 3.922],
  		df19: [0.688, 0.861, 1.066, 1.328, 1.729, 2.093, 2.205, 2.539, 2.861, 3.174, 3.579, 3.883],
  		df20: [0.687, 0.860, 1.064, 1.325, 1.725, 2.086, 2.197, 2.528, 2.845, 3.153, 3.552, 3.850],
  		df21: [0.686, 0.859, 1.063, 1.323, 1.721, 2.080, 2.189, 2.518, 2.831, 3.135, 3.527, 3.819],
  		df22: [0.686, 0.858, 1.061, 1.321, 1.717, 2.074, 2.183, 2.508, 2.819, 3.119, 3.505, 3.792],
  		df23: [0.685, 0.858, 1.060, 1.319, 1.714, 2.069, 2.177, 2.500, 2.807, 3.104, 3.485, 3.768],
  		df24: [0.685, 0.857, 1.059, 1.318, 1.711, 2.064, 2.172, 2.492, 2.797, 3.091, 3.467, 3.745],
  		df25: [0.684, 0.856, 1.058, 1.316, 1.708, 2.060, 2.167, 2.485, 2.787, 3.078, 3.450, 3.725],
  		df26: [0.684, 0.856, 1.058, 1.315, 1.706, 2.056, 2.162, 2.479, 2.779, 3.067, 3.435, 3.707],
  		df27: [0.684, 0.855, 1.057, 1.314, 1.703, 2.052, 2.158, 2.473, 2.771, 3.057, 3.421, 3.690],
  		df28: [0.683, 0.855, 1.056, 1.313, 1.701, 2.048, 2.154, 2.467, 2.763, 3.047, 3.408, 3.674],
  		df29: [0.683, 0.854, 1.055, 1.311, 1.699, 2.045, 2.150, 2.462, 2.756, 3.038, 3.396, 3.659],
  		df30: [0.683, 0.854, 1.055, 1.310, 1.697, 2.042, 2.147, 2.457, 2.750, 3.030, 3.385, 3.646],
  		df40: [0.681, 0.851, 1.050, 1.303, 1.684, 2.021, 2.123, 2.423, 2.704, 2.971, 3.307, 3.551],
  		df50: [0.679, 0.849, 1.047, 1.299, 1.676, 2.009, 2.109, 2.403, 2.678, 2.937, 3.261, 3.496],
  		df60: [0.679, 0.848, 1.045, 1.296, 1.671, 2.000, 2.099, 2.390, 2.660, 2.915, 3.232, 3.460],
  		df80: [0.678, 0.846, 1.043, 1.292, 1.664, 1.990, 2.088, 2.374, 2.639, 2.887, 3.195, 3.416],
  		df100: [0.677, 0.845, 1.042, 1.290, 1.660, 1.984, 2.081, 2.364, 2.626, 2.871, 3.174, 3.390],
  		df1000: [0.675, 0.842, 1.037, 1.282, 1.646, 1.962, 2.056, 2.330, 2.581, 2.813, 3.098, 3.300],
  		z: [0.674, 0.841, 1.036, 1.282, 1.645, 1.960, 2.054, 2.326, 2.576, 2.807, 3.091, 3.291]
  	};

  	
});
