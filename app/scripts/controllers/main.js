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

      calcManyCols();
      $scope.calcTwoAnova();

  		
      console.log(selectedColObj);
      console.log(selectedColObj2);
      console.log(selectedColObj3);

      
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
          console.log(selectedColObj[dataArr]);
          delete selectedColObj[dataArr];
        }

        for (dataArr in selectedColObj2) {
          delete selectedColObj2[dataArr];
        }
        for (dataArr in selectedColObj3) {
          delete selectedColObj3[dataArr];
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
      $scope.selectedColContain2 = [];
      $scope.selectedColContain3 = [];

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
  	var selectedColObj = {},
        selectedColArr = [],
        selectedColObj2 = {},
        selectedColObj3 = {},
        cellsSquaredX = [],
        cellsSquaredY = [],
        cellsXY = [],
        cellsDiff = [],
        cellsDiffSquared = [],
        colXArr = [],
        colYArr = [],
        allCols = [],
        arrCont = [],
        numberCols = [],
        valueArr = [],
        multiColArr = [],
        colSums = [],
        colNums = [],
        colMeans = [],
        colSquares = [],
        factor1Arr1 = [],
        factor1Arr2 = [],
        factor1Arr3 = [],
        factor2Arr1 = [],
        factor2Arr2 = [],
        factor2Arr3 = [],
        factor1Concat = [],
        factor1All = [],
        factor2Concat = [],
        factor2All = [],
        factor1SubMeans = [],
        factor2SubMeans = [],
        oneSSTreatArr = [];



  	var cellsCounterX = 0;
  	var cellsCounterY = 0;
  	var varCell = $scope.cells;
  	var emptyCols = true;
    

  	$scope.selectedColContain = [];
    $scope.selectedColContain2 = [];
    $scope.selectedColContain3 = [];
    $scope.selectCol = 0;

  	// Declaring vars used in multiple functions. 
  	var selectedColNum,
        colX,
        colY,
        colXSum,
        colYSum,
        cellsXYSum,
        cellsSquaredXSum,
        cellsSquaredYSum,
        cellsDiffSum,
        cellsDiffSquaredSum,
        numberSamples,
        numberSamplesX,
        numberSamplesY,
        rScore,
        rScore1,
        rScore2,
        rScore3,
        rScore4,
        meanX,
        meanY,
        indTScore,
        indTScore1,
        indTScore2,
        indTScore3,
        indTScore4,
        indTScore5,
        indTScore6,
        depTScore,
        depTScore1,
        depTScore2,
        depTScore3,
        depTScore4,
        indDf,
        depDf,
        degreesFreedom,
        chosenT,
        confidenceLevel,
        indTEffectSize,
        col1Arr,
        col2Arr,
        arrIndex,
        activeGroups,
        grandMean,
        grandSum,
        oneSSTotal,
        oneSSTreat,
        oneSSErr,
        oneCorrectionMean,
        oneMeanSqrTreat,
        oneMeanSqrErr,
        oneFScore,
        factor1Sum1,
        factor1Sum2,
        factor1Sum3,
        factor2Sum1,
        factor2Sum2,
        factor2Sum3,
        factor1Mean1,
        factor1Mean2,
        factor1Mean3,
        factor2Mean1,
        factor2Mean2,
        factor2Mean3,
        factor1GrandSum,
        factor2GrandSum,
        factor1GrandMean,
        factor2GrandMean,
        SS1Grp1,
        SS1Grp2,
        SS1Grp3,
        SS2Grp1,
        SS2Grp2,
        SS2Grp3,
        SS1Total,
        SS2Total;

    // Function to route the function called by clicking the 
    // column buttons to a different function depending upon
    // the current selected group.
    $scope.changeGroup = function(column) {

      if ($scope.colorCheck === "grp1") {

        colGroup1(column);

      } else if ($scope.colorCheck === "grp2") {

        colGroup2(column);

      } else if ($scope.colorCheck === "grp3") {

        colGroup3(column);

      }

    };

    // Initially setting the called function to group one.
    $scope.colorCheck = "grp1";


    // Function for the default column group 1, green.
  	function colGroup1(column) {


      // If the clicked column doesn't currently belong to any groups, add it to this group.
  		if ($scope.selectedColContain.indexOf(column + 1) === -1 &&
       $scope.selectedColContain2.indexOf(column + 1) === -1 &&
       $scope.selectedColContain3.indexOf(column + 1) === -1) {
  		  
        $scope.selectedColContain.push(column + 1);
        

  		} else {

        // Else, if the clicked column already belongs to group 1, delete it from group 1.
        if ($scope.selectedColContain.indexOf(column + 1) !== -1) {

          $scope.selectedColContain.splice($scope.selectedColContain.indexOf(column + 1), 1);
          delete selectedColObj[($scope.selectedColContain.indexOf(column + 1), 1)];

        // If it belongs to group 2, delete it from there.
        } else if ($scope.selectedColContain2.indexOf(column + 1) !== -1) {

          $scope.selectedColContain2.splice($scope.selectedColContain2.indexOf(column + 1), 1);
          delete selectedColObj2[($scope.selectedColContain.indexOf(column + 1), 1)];

        // If it belongs to group 3, delete it from there.
        } else if ( $scope.selectedColContain3.indexOf(column + 1) !== -1) {

          $scope.selectedColContain3.splice($scope.selectedColContain3.indexOf(column + 1), 1);
          delete selectedColObj3[($scope.selectedColContain.indexOf(column + 1), 1)];

        }	
  		}

  	}

    // Function for the column group 2, red.
    function colGroup2(column) {

      // If the clicked column doesn't currently belong to any groups, add it to this group.
      if ($scope.selectedColContain.indexOf(column + 1) === -1 &&
       $scope.selectedColContain2.indexOf(column + 1) === -1 &&
       $scope.selectedColContain3.indexOf(column + 1) === -1) {
        
        $scope.selectedColContain2.push(column + 1);
        

      } else {

        // Else, if the clicked column already belongs to group 1, delete it from group 1.
        if ($scope.selectedColContain.indexOf(column + 1) !== -1) {

          $scope.selectedColContain.splice($scope.selectedColContain.indexOf(column + 1), 1);
          delete selectedColObj[($scope.selectedColContain.indexOf(column + 1), 1)];
          
        // If it belongs to group 2, delete it from there.
        } else if ($scope.selectedColContain2.indexOf(column + 1) !== -1) {

          $scope.selectedColContain2.splice($scope.selectedColContain2.indexOf(column + 1), 1);
          delete selectedColObj2[($scope.selectedColContain.indexOf(column + 1), 1)];

        // If it belongs to group 3, delete it from there.
        } else if ( $scope.selectedColContain3.indexOf(column + 1) !== -1) {

          $scope.selectedColContain3.splice($scope.selectedColContain3.indexOf(column + 1), 1);
          delete selectedColObj3[($scope.selectedColContain.indexOf(column + 1), 1)];

        } 
      }

      
    }

    // Function for the column group 3, blue.
    function colGroup3(column) {

      // If the clicked column doesn't currently belong to any groups, add it to this group.
      if ($scope.selectedColContain.indexOf(column + 1) === -1 &&
       $scope.selectedColContain2.indexOf(column + 1) === -1 &&
       $scope.selectedColContain3.indexOf(column + 1) === -1) {
        
        $scope.selectedColContain3.push(column + 1);
        
      } else {

        // Else, if the clicked column already belongs to group 1, delete it from group 1.
        if ($scope.selectedColContain.indexOf(column + 1) !== -1) {

          $scope.selectedColContain.splice($scope.selectedColContain.indexOf(column + 1), 1);
          delete selectedColObj[($scope.selectedColContain.indexOf(column + 1), 1)];

        // If it belongs to group 2, delete it from there.
        } else if ($scope.selectedColContain2.indexOf(column + 1) !== -1) {

          $scope.selectedColContain2.splice($scope.selectedColContain2.indexOf(column + 1), 1);
          delete selectedColObj2[($scope.selectedColContain.indexOf(column + 1), 1)];

        // If it belongs to group 3, delete it from there.
        } else if ( $scope.selectedColContain3.indexOf(column + 1) !== -1) {

          $scope.selectedColContain3.splice($scope.selectedColContain3.indexOf(column + 1), 1);
          delete selectedColObj3[($scope.selectedColContain.indexOf(column + 1), 1)];

        } 
      }
    }


    // Function for addition of two numbers
    function add(a, b) {
      	return a + b;
  	}

    // Parses the data in the columns and groups it into a more usable format. 
    function parseSelectedData() {

      // Loops through all the columns in the spreadsheet.
      for (i=0; i <= $scope.columns.length; i++) {


        // If the current iteration column is in at least one of the groups.
        if ($scope.selectedColContain.indexOf(i) !== -1 ||
          $scope.selectedColContain2.indexOf(i) !== -1 ||
          $scope.selectedColContain3.indexOf(i) !== -1) {


          // If the current iteration column is in group 1.
          if ($scope.selectedColContain.indexOf(i) !== -1) {

            // Declares an array for the current column's contained values.
            selectedColObj[i] = [];

            // Saves the current location of the column within the selected column group.
            arrIndex = $scope.selectedColContain.indexOf(i);

            // Loops through all the rows in the spreadsheet.
            for (j=1; j <= $scope.rows.length; j++) {

             
              // If the j values in the current array aren't empty/null for the current iteration...
              if (isNaN(varCell['var' + $scope.selectedColContain[arrIndex] + 'r' + j]) === false && varCell['var' + $scope.selectedColContain[arrIndex] + 'r' + j] !== '') {
                // Pushes the value to the array defined previously, using the correct index.
                selectedColObj[i].push(parseFloat(varCell['var' + $scope.selectedColContain[arrIndex] + 'r' + j]));

              }
            }
          // If the current iteration column is in group 2. See group 1 for comments.
          } else if ($scope.selectedColContain2.indexOf(i) !== -1) {

            selectedColObj2[i] = [];

            for (j=1; j <= $scope.rows.length; j++) {

              arrIndex = $scope.selectedColContain2.indexOf(i);

              if (isNaN(varCell['var' + $scope.selectedColContain2[arrIndex] + 'r' + j]) === false && varCell['var' + $scope.selectedColContain2[arrIndex] + 'r' + j] !== '') {

                selectedColObj2[i].push(parseFloat(varCell['var' + $scope.selectedColContain2[arrIndex] + 'r' + j]));
              }
            }

          // If the current iteration column is in group 3. See group 1 for comments.
          } else if ($scope.selectedColContain3.indexOf(i) !== -1) {

            selectedColObj3[i] = [];

            for (j=1; j <= $scope.rows.length; j++) {

              arrIndex = $scope.selectedColContain3.indexOf(i);

              if (isNaN(varCell['var' + $scope.selectedColContain3[arrIndex] + 'r' + j]) === false && varCell['var' + $scope.selectedColContain3[arrIndex] + 'r' + j] !== '') {

                selectedColObj3[i].push(parseFloat(varCell['var' + $scope.selectedColContain3[arrIndex] + 'r' + j]));
              }
            }
          }

        } else {
        }

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


    function calcManyCols () {
      
      parseSelectedData();

    	allCols.length = 0;
    	arrCont.length = 0;
    	colSums.length = 0;
    	colNums.length = 0;
    	colMeans.length = 0;
    	colSquares.length = 0;

      factor1Arr1.length = 0;
      factor1Arr2.length = 0;
      factor1Arr3.length = 0;
      factor2Arr1.length = 0;
      factor2Arr2.length = 0;
      factor2Arr3.length = 0;

      factor1Concat.length = 0;
      factor2Concat.length = 0;

    	multiColArr.length = 0;
      activeGroups = 0;
      numberCols.length = 0;

      // If the selectedCol group 1 object has something in it.
      if (Object.keys(selectedColObj).length !== 0) {

        // Storing the number of columns in this group in an array for later use.
        numberCols[0] = Object.keys(selectedColObj).length;

        // Loops through the object keys.
        Object.keys(selectedColObj).forEach(function(key) {

          // Sets a value equal to the array in the object value and pushes it to an 
          // array of arrays containing all of the columns in all groups.
          valueArr = selectedColObj[key];
          multiColArr.push(valueArr);

          // Loops through that array.
          for (i=0; i < valueArr.length; i++) {

            // Then pushes the values to allCols, an array containing all of the values independent
            // of column, and the array for the it's specific first factor. 
            allCols.push(valueArr[i]);
            factor1Arr1.push(valueArr[i]);

          }     
        });

      } else {

        // Else, this group is empty.
        numberCols[0] = 0;

      }

      if (Object.keys(selectedColObj2).length !== 0) {

        numberCols[1] = Object.keys(selectedColObj2).length;
      
        Object.keys(selectedColObj2).forEach(function(key) {

          valueArr = selectedColObj2[key];
          multiColArr.push(valueArr);

          for (i=0; i < valueArr.length; i++) {

            allCols.push(valueArr[i]);
            factor1Arr2.push(valueArr[i]);

          }
        });

      } else {

        numberCols[1] = 0;
      }

      if (Object.keys(selectedColObj3).length !== 0) {

        numberCols[2] = Object.keys(selectedColObj3).length;

        Object.keys(selectedColObj3).forEach(function(key) {

          valueArr = selectedColObj3[key];
          multiColArr.push(valueArr);

          for (i=0; i < valueArr.length; i++) {

            allCols.push(valueArr[i]);
            factor1Arr3.push(valueArr[i]);

          }  
        });

      } else {

        numberCols[2] = 0;
      }


      // The following three functions count how many columns there are in each group.
      if (numberCols[0] > 0) {
        activeGroups += 1;
      }

      if (numberCols[1] > 0) {
        activeGroups += 1;
      } 

      if (numberCols[2] > 0) {
        activeGroups += 1;
      } 


      // If group one has something in it.
      if (numberCols[0] > 0) {

        // Loops once for each column in each group, skipping by the number of columns
        // each iteration so that e.g. the first col of group 1, 2, & 3 are grouped.
        for (i=0; i < (numberCols[0] * activeGroups); i += numberCols[0]) {

          // Declares a var for the array containing the data for ease.
          valueArr = multiColArr[i];
          
          // Loops through the value array and pushes it to the second factor for this specific group.
          for (j=0; j < valueArr.length; j++) {

            factor2Arr1.push(valueArr[j]);
          }
        }
      }

      if (numberCols[0] >= 2 && numberCols[1] >= 2) {
      
        for (i=1; i < ((numberCols[0] * activeGroups)); i += numberCols[0]) {

          valueArr = multiColArr[i];

          for (j=0; j < valueArr.length; j++) {

            factor2Arr2.push(valueArr[j]);
          }
        }
      }

      if (numberCols[0] >= 3 && numberCols[1] >= 3) {

        for (i=2; i < ((numberCols[0] * activeGroups)); i += numberCols[0]) {

          valueArr = multiColArr[i];

          for (j=0; j < valueArr.length; j++) {

            factor2Arr3.push(valueArr[j]);
          }
        }
      }

      factor1Sum1 = factor1Arr1.reduce(add, 0);
      factor1Sum2 = factor1Arr2.reduce(add, 0);
      factor1Sum3 = factor1Arr3.reduce(add, 0);

      factor2Sum1 = factor2Arr1.reduce(add, 0);
      factor2Sum2 = factor2Arr2.reduce(add, 0);
      factor2Sum3 = factor2Arr3.reduce(add, 0);

      factor1Mean1 = factor1Sum1 / factor1Arr1.length;
      factor1Mean2 = factor1Sum2 / factor1Arr2.length;
      factor1Mean3 = factor1Sum3 / factor1Arr3.length;

      factor2Mean1 = factor2Sum1 / factor2Arr1.length;
      factor2Mean2 = factor2Sum2 / factor2Arr2.length;
      factor2Mean3 = factor2Sum3 / factor2Arr3.length;

      factor1GrandSum = factor1Sum1 + factor1Sum2 + factor1Sum3;
      factor1GrandMean = factor1GrandSum / (factor1Arr1.length + factor1Arr2.length + factor1Arr3.length);

      factor2GrandSum = factor2Sum1 + factor2Sum2 + factor2Sum3;
      factor2GrandMean = factor2GrandSum / (factor2Arr1.length + factor2Arr2.length + factor2Arr3.length);

      // Iterates through the final column container
    	for (i=0; i < multiColArr.length; i++) {

        // Defines values in individual arrays for access by formulas later.

    		colSums.push(multiColArr[i].reduce(add, 0));
    		colNums.push(multiColArr[i].length);
    		colMeans.push(colSums[i] / colNums[i]);
    		
    	}

      // Iterates through the array containing all values regardless of column.
    	for (i=0; i < allCols.length; i++) {

        // And defines values in individual array for access by formulas later.

    		colSquares.push(Math.pow(allCols[i], 2));
    		
    	}

      // Defining some more math vars used by formulas.

    	grandSum = allCols.reduce(add, 0);
    	grandMean = grandSum / allCols.length;

    }


    $scope.calcTwoAnova = function() {

      console.log(factor1Arr1);
      console.log(factor1Arr2);
      console.log(factor1Arr3);
      console.log(factor2Arr1);
      console.log(factor2Arr2);
      console.log(factor2Arr3);

      if (factor1Arr1.length > 0) {

        SS1Grp1 = Math.pow((factor1Mean1 - grandMean), 2) * factor1Arr1.length;

      }

      if (factor1Arr2.length > 0) {

        SS1Grp2 = Math.pow((factor1Mean2 - grandMean), 2) * factor1Arr2.length;
        
      }

      if (factor1Arr3.length > 0) {

        SS1Grp3 = Math.pow((factor1Mean3 - grandMean), 2) * factor1Arr3.length;
        
      }



      if (factor2Arr1.length > 0) {

        SS2Grp1 = Math.pow((factor2Mean1 - grandMean), 2) * factor2Arr1.length;
      }

      if (factor2Arr2.length > 0) {

        SS2Grp2 = Math.pow((factor2Mean2 - grandMean), 2) * factor2Arr2.length;
      }

      if (factor2Arr3.length > 0) {

        SS2Grp3 = Math.pow((factor2Mean3 - grandMean), 2) * factor2Arr3.length;
      }


      SS1Total = SS1Grp1 + SS1Grp2 + SS1Grp3;
      SS2Total = SS2Grp1 + SS2Grp2 + SS2Grp3;

      for (i=0; i < numberCols[0]; i++) {

        factor1SubMeans.push(factor1Arr1[i]);

      }


      console.log(colNums);



    };





    function calcTwoCols () {

    	if (col1Arr !== undefined && col2Arr !== undefined && col1Arr.length !== 0 && col2Arr.length !== 0) {

	    	// ... Sum, square, multiply and find the difference between the cols.
	     	colXSum = col1Arr.reduce(add, 0);
	      colYSum = col2Arr.reduce(add, 0);
	     	cellsXYSum = cellsXY.reduce(add, 0);
	  		cellsSquaredXSum = cellsSquaredX.reduce(add, 0);
	  		cellsSquaredYSum = cellsSquaredY.reduce(add, 0);
	  		cellsDiffSum = cellsDiff.reduce(add, 0);
	  		cellsDiffSquaredSum = cellsDiffSquared.reduce(add, 0);

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

    function groupData() {

      // Declares the cols to to be compared as the selected arrays.
      
      /* This needs to change to work with more than two cols */

        col1Arr = selectedColObj[$scope.selectedColContain[0]];
        col2Arr = selectedColObj[$scope.selectedColContain[1]];

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

    $scope.calcRScore = function () {

    	calcTwoCols();

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
  		calcTwoCols();

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
  		calcTwoCols();

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

  	$scope.calcOneAnova = function() {

      // Initially calling the function that prepares the selected columns for math.
  		calcManyCols();

      // Clearing the vars for each click of the btn.
  		oneSSTreatArr.length = 0;
  		oneSSTotal = 0;
  		oneSSTreat = 0;
  		oneSSErr = 0;
  		oneMeanSqrTreat = 0;
  		oneMeanSqrErr = 0;
  		oneFScore = 0;
  		oneCorrectionMean = 0;


  		for (i=0; i < multiColArr.length; i++) {

  			oneSSTreatArr.push(Math.pow(colSums[i], 2) / multiColArr[i].length);
  		}

  		oneCorrectionMean = Math.pow(allCols.reduce(add, 0), 2) / allCols.length;
  		oneSSTotal = colSquares.reduce(add, 0) - oneCorrectionMean;
  		oneSSTreat = oneSSTreatArr.reduce(add, 0) - oneCorrectionMean;
  		oneSSErr = oneSSTotal - oneSSTreat;

  		oneMeanSqrTreat = oneSSTreat / (colSums.length - 1);
  		oneMeanSqrErr = oneSSErr / (allCols.length - colSums.length);

  		oneFScore = oneMeanSqrTreat / oneMeanSqrErr;

      console.log(oneFScore);


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
