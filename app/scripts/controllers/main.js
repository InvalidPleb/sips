'use strict';

// @ngdoc function
// @name statscalcApp.controller:MainCtrl
// @description
// testing 

angular.module('statscalcApp')
  .controller('MainCtrl', function ($scope, $parse) {

  	// Declaring spreadsheet parts as arrays/objects
  	$scope.columns = ['var1'];
  	$scope.rows = [];
  	$scope.cells = {};

  	// Iteration vars i & j
  	var i;
  	var j;

  	// Default/starting number of rows/cols in spreadsheet 
  	var numRows = 15;
  	var numCols = 10;

  	// Populating the rows and columns with empty cells 
  	for (i=1; i <= numRows; i++) {
  		$scope.rows.push(i);
  	}

  	for (i=2; i <= numCols; i++) {
  		$scope.columns.push('var' + i);
  	}

  	// Button for debugging purposes. Will be hidden in release
  	$scope.debugBtn = function() {
      parseSelectedData();
      console.log($scope.selectedColContain);
    };

    // The following four functions iterate through the spreadsheet and 
    // add and delete rows and cols on button push
    $scope.addRow = function() {
    	$scope.rows.push($scope.rows.length + 1);
    };

    $scope.addCol = function(){
    	$scope.columns.push('var' + ($scope.columns.length + 1));
    	console.log($scope.columns.length);

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

    // Function to automatically evaluate equations in cells
  	$scope.computeCells = function(cell) {
    	return $parse($scope.cells[cell])($scope);
  	};


  	// Clear button resets the spreadsheet back to default (as much as possible) 
  	// so no refeshes are necessary
  	$scope.clearBtn = function() {

  		// Declars length of row/col scope as shorter vars
  		numRows = parseInt($scope.rows.length);
  		numCols = parseInt($scope.columns.length);

  		// Clears out $scope.cells and selectedColObj
        for (var cell in $scope.cells) {
          delete $scope.cells[cell];
        }

        for (var dataArr in selectedColObj) {
          delete selectedColObj[dataArr];
        }

        // Iterates through spreadsheet and 
        // deletes/adds cols/rows to reset to default
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

  		// Resets scopes
  		$scope.inputRows = '';
  		$scope.inputCols = '';
  		$scope.selectedColContain = [];

  	};

  	// Watches input and sets vars that are used in other functions
  	$scope.updateInputRows = function() {

  		numRows = parseInt($scope.rows.length);
  	};

  	$scope.updateInputCols = function() {

  		numCols = parseInt($scope.columns.length);
  	};



  	// Sets the table to the rows/cols length specified in 
  	// input fields
  	$scope.setTable = function() {

  		// Initially declaring pushRows + Cols as int
  		var pushRows = 0;
  		var pushCols = 0;

  		// If the input field isn't empty ...
  		if ($scope.inputRows !== '' && $scope.inputRows !== undefined && $scope.inputRows !== 0) {

  			// ... And if the input number is greater than the current row length ...
  			if ($scope.inputRows > $scope.rows.length) {

  				// ... Then push the extra rows on top.
	  			pushRows = $scope.inputRows - $scope.rows.length;
	  			for (i = ($scope.rows.length + 1); i <= (numRows + pushRows); i++) {
	  				$scope.rows.push(i);
	  			}

  			} else {

  				// Else, if the input is less than the current row length,
  				// iterate through the rows, deleting rows if they are over the
  				// specified input.
  				pushRows = $scope.inputRows;
  				for (i = ($scope.rows.length); i >= (pushRows); i--) {
	  				$scope.rows.splice(i);
	  			}

  			}
  		}

  		// If the input field isn't empty ...
  		if ($scope.inputCols !== '' && $scope.inputCols !== undefined && $scope.inputCols !== 0) {

  			// ... And if the input is greater than the column length ...
  			if ($scope.inputCols > $scope.columns.length) {

  				// ... Then push the extra cols on top of the array.
	  			pushCols = $scope.inputCols - $scope.columns.length;
	  			for (i = ($scope.columns.length + 1); i <= (numCols + pushCols); i++) {
	  				$scope.columns.push('var' + i);
	  			}

  			} else {

  				// Else, if the input is less than the current col length,
  				// iterate through the cols, deleting cols if they are over the
  				// specified input.
  				pushCols = $scope.inputCols;
  				for (i = ($scope.columns.length); i >= (pushCols); i--) {
	  				$scope.columns.splice(i);
	  			}
  			}
  		}

  	};

  	// Declaring vars as arrays and objects as needed.
  	var selectedColObj = {};
  	var selectedColArr = [];
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
  	var selectedColNum;

  	$scope.selectedColContain = [];
	$scope.selectCol = 0;

  	// Declaring vars used in multiple functions. 
  	// Will slim down / shift these inside functions eventually.
  	var colX;
    var colY;
    var colXSum;
    var colYSum;
    var cellsXYSum;
    var cellsSquaredXSum;
    var cellsSquaredYSum;
    var cellsDiffSum;
    var cellsDiffSquaredSum;
  	var numberSamples;
    var numberSamplesX;
    var numberSamplesY;
    var rScore;
    var rScore1;
    var rScore2;
    var rScore3;
    var rScore4;
    var meanX;
    var meanY;
    var indTScore;
  	var indTScore1;
    var indTScore2;
    var indTScore3;
    var indTScore4;
    var indTScore5;
    var indTScore6;
    var depTScore;
    var depTScore1;
    var depTScore2;
    var depTScore3;
  	var depTScore4;
    var indDf;
    var depDf;
    var degreesFreedom;
    var chosenT;
    var confidenceLevel;
    var indTEffectSize;
    var col1Arr;
    var col2Arr;
	var arrIndex;
	var emptyCols = true;


	// Function that is called when a column is selected by the user
  	$scope.setSelectCol = function(column) {

  		$scope.selectCol = column;

  		// If the column that was just clicked on is not currently inside
  		// of the selected array, add it to the array. 
  		if ($scope.selectedColContain.indexOf($scope.selectCol + 1) === -1) {

  			$scope.selectedColContain.push($scope.selectCol + 1);

  		} else {

  			// Else, remove it from the array and the object that mirrors that array.
  			$scope.selectedColContain.splice($scope.selectedColContain.indexOf($scope.selectCol + 1), 1);
  			delete selectedColObj[column + 1];
  			
  		}

  	};

  	// Function for addition of two numbers
  	function add(a, b) {
    	return a + b;
	}

	// Function to group the data contained in the rows and cols
	// into a useable format; an object of arrays.
	function parseSelectedData() {

		cellsCounterX = 0;
		cellsCounterY = 0;

		// Iterates through the cols ...
  		for (i=0; i <= $scope.columns.length; i++) {

  			// ... and if the column is selected by the user ...
  			if ($scope.selectedColContain.indexOf(i) !== -1) {

  				// ... an array is declared for the data inside of it.
  				selectedColArr[i] = [];

  				// Iterates through the rows ... 
	  			for (j=1; j <= $scope.rows.length; j++) {

	  				// ... and declares a var to save the order in which the selected
	  				// cols were clicked.
	  				arrIndex = $scope.selectedColContain.indexOf(i);

	  				// If the cell with the col(i),row(j) coordinates isn't empty ...
	  				if (isNaN(varCell['var' + $scope.selectedColContain[arrIndex] + 'r' + j]) === false && varCell['var' + $scope.selectedColContain[arrIndex] + 'r' + j] !== '') {
	  					
	  					// ... add the data contained in the cell to the selected data array.
	  					selectedColArr[i].push(parseFloat(varCell['var' + $scope.selectedColContain[arrIndex] + 'r' + j]));
	  				}
	  			}

	  			// If the array for this selected column (i) isn't empty, 
	  			// then add it to the final data object. The obj
	  			// ends up with a data array for each selected column.
	  			if (selectedColArr[i].length > 0) {
	  				selectedColObj[i] = selectedColArr[i];
	  			} 
  			}
  		}

  	  	console.log(selectedColArr);
	}

	// Function to prepare data for calculation.
	// This is called by every test/calc button.
	function groupData() {

		// Declares the cols to to be compared as the selected arrays.
		
		/* This needs to change to work with more than two cols */

  		col1Arr = selectedColArr[$scope.selectedColContain[0]];
  		col2Arr = selectedColArr[$scope.selectedColContain[1]];

  		// If the selected cols are not empty ...
  		if (col1Arr !== undefined && col2Arr !== undefined && col1Arr.length !== 0 && col2Arr.length !== 0) {

  			// ... and if the number of filled data in the columns are the same ... 
  			if (col1Arr.length === col2Arr.length) {

  				// ... then iterate through one array and declare some
  				// vars used for calculations.
  				for (i=0; i < col1Arr.length; i++) {

  					cellsSquaredX[i] = Math.pow(col1Arr[i], 2);
  					cellsSquaredY[i] = Math.pow(col2Arr[i], 2);
  					cellsXY[i] = cellsSquaredX[i] * cellsSquaredY[i];
  					cellsDiff[i] = cellsSquaredX[i] - cellsSquaredY[i];
  					cellsDiffSquared[i] = Math.pow(cellsDiff[i], 2);
  				}
  			}

  			// Declares n values 
  			numberSamplesX = col1Arr.length;
  			numberSamplesY = col2Arr.length;

  		} else {

  			console.log("missing values in col1 or col2");
  		}
	}

	$scope.varNaming = function() {


      
    };

    // Function to find the proper critical value in
    // the t table for the given calculation.
    // This is called by the dep & ind t score calcs.
    function tLookup (df, tScore) {

    	// Declares vars for simplicity
    	var tableDf = 0;
	    var tableKeys = Object.keys(tDistributionTable);

	    // Because the t table doesn't have every df value 
	    // between 30 and 1000, the df values greater than 
	    // 30 must be rounded down to the nearest available value.
	    
	    // Df values under 30 are all available, but over
	    // 30 the table begins incrementing by 10.
	    
	    // If the df is greater than 30 ...  
       	if (df <= 30) {

       		// ... the df doesn't need to be rounded.
        	degreesFreedom = tDistributionTable['df' + df];

        // But if the df is greater ...
        } else if (df > 30 && df <= 1000) {

        	// ... iterate through the available df values ...
        	for (i=0; i <= (tableKeys.length - 2); i++) {

	            tableDf = tableKeys[i].substr(2);

	            // ... and if the table df of this iteration is greater than the calculated df ...
	            if (parseInt(tableDf) > df) {

	            	// ... then declare an array with the critical values contained in that df key.
		            degreesFreedom = tDistributionTable[tableKeys[i - 1]];
		            i = (tableKeys.length - 2);
	            }
          	}
        } else {

        	// Throws error if df is greater than 1000 because t table does not offer it.
          	console.error("df is greater than 1000");
        }

        // Iterates through the just created array with the proper df critical values.
	   	for (i=1; i < degreesFreedom.length; i++) {

	   		// If the critical value is greater than the absolute value of the calculated tScore ...
	   		if (degreesFreedom[i] > Math.abs(tScore)) {

	   			// ... then select the previous critical value and declare a var for it.
	   			chosenT = degreesFreedom[i - 1];
	   			confidenceLevel = tDistributionTable.p[i - 1];
	   			i = degreesFreedom.length;

	   		} else {

	   			// This means the p value is so significant that it isn't in the table.
	   			chosenT = "P value is less than .0005";
	   		}
	   	}
    }

    function calcColumns () {

    	if (col1Arr !== undefined && col2Arr !== undefined && col1Arr.length !== 0 && col2Arr.length !== 0) {

	    	// ... Sum, square, multiply and find the difference between the cols.
	     	colXSum = col1Arr.reduce(add, 0);
	      	colYSum = col2Arr.reduce(add, 0);
	     	cellsXYSum = cellsXY.reduce(add, 0);
	  		cellsSquaredXSum = cellsSquaredX.reduce(add, 0);
	  		cellsSquaredYSum = cellsSquaredY.reduce(add, 0);
	  		cellsDiffSum = cellsDiff.reduce(add, 0);
	  		cellsDiffSquaredSum = cellsDiffSquared.reduce(add, 0);

	  		// Var to track if the columns are empty or filled
	  		emptyCols = false;

	  		// If the n values are equal let's just use one var
	  		if (numberSamplesX === numberSamplesY) {
	  			numberSamples = numberSamplesX;
	  		} else {
    			console.log("different group sizes");
    		}

  		} else {
    		console.log("missing values in col1 or col2");
    	}

    }

    $scope.calcRScore = function () {

    	calcColumns();

		//-------- Pearson's r score calculation --------//
		// Using hand calculation formula taken
		// from this source: http://psc.dss.ucdavis.edu/sommerb/sommerdemo/correlation/hand/pearson_hand.htm
		
		
	    rScore1 = (numberSamples * cellsXYSum) - (colXSum * colYSum);
	    rScore2 = (numberSamples * cellsSquaredXSum) - Math.pow(colXSum, 2);
	    rScore3 = (numberSamples * cellsSquaredYSum) - Math.pow(colYSum, 2);
	    rScore4 = Math.sqrt((rScore2 * rScore3));
	    rScore = rScore1 / rScore4;

    	

    };

    // Function to calc the independent t test

  	$scope.calcIndTTest = function () {

  		// Calls previously defined functions to get data in useful format.

  		parseSelectedData();
  		groupData();
  		calcColumns();

  		// If the col arrays are not empty ...
  		if (emptyCols === false) {

	    	//--------- Independent t Score calculation ---------// 
	    	
	    	// Using hand calculation formula taken
	    	// from this source: http://psc.dss.ucdavis.edu/sommerb/sommerdemo/stat_inf/tutorials/ttesthand.htm
	    	
	    	// Finding mean of each col
		   	meanX = colXSum / numberSamplesX;
		   	meanY = colYSum / numberSamplesY;

		   	// Finding difference between means
		   	indTScore1 = meanX - meanY;

		   	// Variance calculations for each col
		   	indTScore2 = cellsSquaredXSum - (Math.pow(colXSum, 2) / numberSamplesX);
		   	indTScore3 = cellsSquaredYSum - (Math.pow(colYSum, 2) / numberSamplesY);

		   	// Calculating df and working out the formula
		   	indTScore4 = (indTScore2 + indTScore3) / ((numberSamplesX + numberSamplesY) - 2);
		   	indTScore5 = (1 / numberSamplesX) + (1 / numberSamplesY);
		   	indTScore6 = Math.sqrt(indTScore4 * indTScore5);
		   	indDf = (numberSamplesX + numberSamplesY) - 2;

		   	// This is the resulting t score
		   	indTScore = indTScore1 / indTScore6;

		   	// Calling tLookup to reference the critical value
		   	tLookup(indDf, indTScore);

		   	// Saving the effect size as var for future output
		   	indTEffectSize = Math.sqrt(Math.pow(indTScore, 2) / (Math.pow(indTScore, 2) + indDf));

		   	console.log(chosenT);
		   	console.log(indTScore);

	   	} else {
	   		console.log("missing values in col1 or col2");
	   	}
  	};

  	// Function to calc the dependent t test.

  	$scope.calcDepTTest = function () {

  		// Calls previously defined functions to get data in useful format.

  		parseSelectedData();
  		groupData();
  		calcColumns();

  		// If the col arrays are not empty ...
  		

  		if (emptyCols === false) {

	  		//--------- Dependent t Score calculation ---------// 
	  		// Using hand calculation formula taken
	    	// from this source: http://psc.dss.ucdavis.edu/sommerb/sommerdemo/stat_inf/tutorials/tcorrhand.htm
		   	
	    	// Calculating the sum of the differences divided by n
		   	depTScore1 = cellsDiffSum / numberSamples;

		   	//Calculating variance
		   	depTScore2 = cellsDiffSquaredSum - (Math.pow(cellsDiffSum, 2) / numberSamples);

		   	// Finding df and working out rest of formula
		   	depTScore3 = numberSamples * (numberSamples - 1);
		   	depTScore4 = Math.sqrt(depTScore2 / depTScore3);
		   	depDf = numberSamples - 1;

		   	// This is the resulting t score
		   	depTScore = depTScore1 / depTScore4;

		   	// Calling tLookup to reference the critical value
		   	tLookup(depDf, depTScore);
		   	
		   	console.log(chosenT);
		   	console.log(depTScore);

		} else {
    		console.log("missing values in col1 or col2");
    	}
  	};

  	$scope.calcAnova = function() {

  	};


  	// Student's T test critical values. 
  	var tDistributionTable = {

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
      p: [0.25, 0.20, 0.15, 0.10, 0.05, 0.025, 0.02, 0.01, 0.005, 0.0025, 0.001, 0.0005],
  		z: [0.674, 0.841, 1.036, 1.282, 1.645, 1.960, 2.054, 2.326, 2.576, 2.807, 3.091, 3.291]
  	};
});
