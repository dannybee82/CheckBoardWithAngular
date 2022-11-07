app.controller('checkerboardController', function ($scope) {          

    /**
     * ShowMenuContents() - Method to show or hide menu.
     * 
     */

    $scope.ShowMenuContents = function () {
        $scope.menuContentVisible = !$scope.menuContentVisible;
    }

    /**
     * GenerateCheckboard() - Use settings (from form) to generate a checkboard.
     * 
     */

    $scope.GenerateCheckboard = function () {
        RemoveAllChildren();

        $scope.numberOfRows = squareOrHexagonSettings.numberOfRows.value;
        $scope.numberOfColumns = squareOrHexagonSettings.numberOfColumns.value;

        $scope.primaryColor = squareOrHexagonSettings.primaryColor.value;
        $scope.secondaryColor = squareOrHexagonSettings.secondaryColor.value;

        $scope.squaresOrHexagons = squareOrHexagonSettings.squaresOrHexagons.value;

        if ($scope.squaresOrHexagons == "squares") {
            $scope.squareWidth = squareOrHexagonSettings.squareWidth.value;
            $scope.squareHeight = squareOrHexagonSettings.squareHeight.value;

            $scope.GenerateSquares();
        } else {
            $scope.tertiaryColor = squareOrHexagonSettings.tertiaryColor.value;
            $scope.hexagonSize = squareOrHexagonSettings.hexagonSize.value;
            $scope.brightnessInPercentages = squareOrHexagonSettings.brightnessInPercentages.value;
            $scope.backgroundColor = squareOrHexagonSettings.backgroundColor.value;

            $scope.GenerateHexagons();
        }        
    }

    /**
     * GenerateSquares() - Method to generate a checkboard with squares.
     * 
     */

    $scope.GenerateSquares = function () {
        let isBlack = new Boolean(true);

        $scope.CalculateTotalWidthAndHeight();

        for (var i = 0; i < $scope.numberOfRows; i++) {
            for (var j = 0; j < $scope.numberOfColumns; j++) {
                div = (isBlack) ? createSquareDiv($scope.primaryColor, $scope.squareWidth, $scope.squareHeight) : createSquareDiv($scope.secondaryColor, $scope.squareWidth, $scope.squareHeight);

                AddChildToContent(div);
                isBlack = !isBlack;
            }

            if ($scope.numberOfColumns % 2 == 0) {
                isBlack = !isBlack;
            }
        }
    }

    /**
     * GenerateHexagons() - method to generate a checkboard with hexagons.
     * 
     */

    $scope.GenerateHexagons = function () {        
        $scope.CalculateTotalWidthAndHeight();
                
        var colorArray = $scope.GetStartColors();

        //colorIndexesForEvenRows & colorIndexesForOddRows -> Different colors for adjacent Hexagons.
        var colorIndexesForEvenRows = $scope.GetColorIndexForHexagon(true, $scope.numberOfColumns, null);
        var colorIndexesForOddRows = $scope.GetColorIndexForHexagon(false, $scope.numberOfColumns, colorIndexesForEvenRows);

        for (var i = 0; i < $scope.numberOfRows; i++) {
            var useColorIndexes = (i % 2 == 0) ? colorIndexesForEvenRows : colorIndexesForOddRows;

            for (var j = 0; j < $scope.numberOfColumns; j++) {   
                var useColorIndex = useColorIndexes[j]
                var div = createHexagonDiv(colorArray[useColorIndex], $scope.hexagonSize, $scope.hexagonHeightDefault);

                colorArray = $scope.ModifyColor(colorArray, useColorIndex, $scope.brightnessInPercentages);

                //Below: add margins, etc.
                if (i % 2 == 1 && j < $scope.numberOfColumns) {
                    if (j == 0) {
                        div.setAttribute('class', 'hex hex-row-odd-first');
                    } else {
                        div.setAttribute('class', 'hex hex-row-odd');
                    }
                } else if (i % 2 == 0 && i > 0) {
                    div.setAttribute('class', 'hex hex-row-even');
                }

                AddChildToContent(div);
            }
        }
    }   

    /**
     * CalculateTotalWidthAndHeight()
     * 
     */

    $scope.CalculateTotalWidthAndHeight = function () {
        $scope.borderOfContent = '1px solid darkgray';

        if ($scope.squaresOrHexagons == "squares") {            
            $scope.totalWidth = $scope.numberOfColumns * $scope.squareWidth;
            $scope.totalHeight = $scope.numberOfRows * $scope.squareHeight;
        } else {
            var ratio = strip($scope.hexagonSize) / strip($scope.hexagonSizeDefault);
            var currrentHexagonHeight = ($scope.hexagonHeightDefault * ratio);
                        
            $scope.totalWidth = ($scope.numberOfColumns * $scope.hexagonSize) + ($scope.numberOfColumns * (2 * ratio)); //- > *2 for extra CSS margin.
            $scope.totalHeight = ($scope.numberOfRows * currrentHexagonHeight) - (($scope.numberOfRows - 1) * ($scope.hexagonMarginTopAbsoluteNumber * ratio));

            if ($scope.numberOfRows > 1) {
                $scope.totalWidth += ($scope.hexagonSize / 2);
            }

            $scope.hexagonMarginLeftAndRight = $scope.hexagonMarginLeftAndRightDefault * ratio;
            $scope.hexagonMarginTop = $scope.hexagonMarginTopDefault * ratio;

            CreateStyleElement($scope.hexagonMarginTop, $scope.hexagonMarginLeftAndRight);
        }
    }

    /**
     * GetStartColors() - Method to get the start colors for the Hexagons.
     * 
     */

    $scope.GetStartColors = function () {
        var colorArray = [$scope.primaryColor, $scope.secondaryColor, $scope.tertiaryColor];

        var rgbCodes = [3];

        for (var i = 0; i < colorArray.length; i++) {
            for (var j = 0; j < $scope.predefinedCssColorNames.length; j++) {
                if ($scope.predefinedCssColorNames[j].colorname == colorArray[i]) {
                    var hex = $scope.predefinedCssColorNames[j].hex;

                    var red = hex.charAt(0) + hex.charAt(1);
                    var green = hex.charAt(2) + hex.charAt(3);
                    var blue = hex.charAt(4) + hex.charAt(5);

                    var rgb = [3];
                    rgb[0] = parseInt(red, 16);
                    rgb[1] = parseInt(green, 16);
                    rgb[2] = parseInt(blue, 16);

                    rgbCodes[i] = rgb;
                    break;
                }
            }           
        }

        return rgbCodes;
    }

    /**
     * ModifyColor() - This method modifies the RGB color.
     * 
     */

    $scope.ModifyColor = function (arr, index, brightness) {
        var color = arr[index];

        var R = color[0];
        var G = color[1];
        var B = color[2];

        if (R == 0 && G == 0 && B == 0) {
            R = 25;
            G = 25;
            B = 25;
        }

        R = parseInt(R * (100 + parseInt(brightness)) / 100);
        G = parseInt(G * (100 + parseInt(brightness)) / 100);
        B = parseInt(B * (100 + parseInt(brightness)) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        color[0] = R;
        color[1] = G;
        color[2] = B;

        arr[index] = color;

        return arr;
    }

    /*
     * GetColorIndexForHexagon() - Method to get the color index for a Hexagon -> Adjacent Hexagons with different color.
     * 
     */

    $scope.GetColorIndexForHexagon = function (isEven, columns, rowOdd) {
        var indexes = new Array();
        if (isEven) {
            for (var i = 0; i < columns; i++) {
                indexes[i] = i % 3;
            }
        } else {
            for (var i = 0; i < columns; i++) {
                if (i < columns - 1) {
                    if (rowOdd[i] == 1 && rowOdd[i + 1] == 2) {
                        indexes[i] = 0;
                    } else if (rowOdd[i] == 2 && rowOdd[i + 1] == 1) {
                        indexes[i] = 0;
                    } else if (rowOdd[i] == 0 && rowOdd[i + 1] == 2) {
                        indexes[i] = 1;
                    } else if (rowOdd[i] == 2 && rowOdd[i + 1] == 0) {
                        indexes[i] = 1;
                    } else if (rowOdd[i] == 0 && rowOdd[i + 1] == 1) {
                        indexes[i] = 2;
                    } else if (rowOdd[i] == 0 && rowOdd[i + 1] == 1) {
                        indexes[i] = 2;
                    }
                } else {
                    if (rowOdd[i] == 1 && indexes[i - 1] == 2) {
                        indexes[i] = 0;
                    } else if (rowOdd[i] == 2 && indexes[i - 1] == 1) {
                        indexes[i] = 0;
                    } else if (rowOdd[i] == 0 && indexes[i - 1] == 2) {
                        indexes[i] = 1;
                    } else if (rowOdd[i] == 2 && indexes[i - 1] == 0) {
                        indexes[i] = 1;
                    } else if (rowOdd[i] == 0 && indexes[i - 1] == 1) {
                        indexes[i] = 2;
                    } else if (rowOdd[i] == 0 && indexes[i - 1] == 1) {
                        indexes[i] = 2;
                    }
                }
            }
        }

        return indexes;
    }

    /**
     * UpdateSliderValue() - This method updates the selected slider value.
     * 
     */

    $scope.UpdateSliderValue = function () {
        document.getElementById('sliderBrightnessValue').innerHTML = $scope.brightnessInPercentages;
    }

});