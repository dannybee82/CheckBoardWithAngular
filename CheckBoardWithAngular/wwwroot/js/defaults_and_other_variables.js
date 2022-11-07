app.directive('defaultsAndOtherVariables', function () {
    return {
        restrict: "A",

        controller: function ($scope) {

            /*
             * Default settings.
             * 
             */

            $scope.numberOfRowsDefault = 8;
            $scope.numberOfColumnsDefault = 8;

            $scope.primaryColorDefault = 'black';
            $scope.secondaryColorDefault = 'gold';
            $scope.tertiaryColorDefault = 'darkgreen';
            $scope.backgroundColorDefault = 'lightgrey';

            $scope.squareWidthDefault = 50;
            $scope.squareHeightDefault = 50;

            $scope.hexagonSizeDefault = 50;
            $scope.hexagonHeightDefault = 57;

            $scope.borderOfContentDefault = 'none';

            $scope.hexagonMarginLeftAndRightDefault = 27;
            $scope.hexagonMarginTopDefault = -12;
            $scope.hexagonMarginTopAbsoluteNumber = 12;

            $scope.brightnessInPercentagesDefault = 0;

            /*
             * ResetAll()
             * 
             */

            $scope.ResetAll = function () {
                RemoveAllChildren();                

                $scope.numberOfRows = $scope.numberOfRowsDefault;
                $scope.numberOfColumns = $scope.numberOfColumnsDefault;

                $scope.primaryColor = $scope.primaryColorDefault;
                $scope.secondaryColor = $scope.secondaryColorDefault;
                $scope.tertiaryColor = $scope.tertiaryColorDefault;
                $scope.backgroundColor = $scope.backgroundColorDefault;

                $scope.squareWidth = $scope.squareWidthDefault;
                $scope.squareHeight = $scope.squareHeightDefault;

                $scope.borderOfContent = $scope.borderOfContentDefault;

                $scope.totalWidth = 0;
                $scope.totalHeight = 0;

                $scope.hexagonSize = $scope.hexagonSizeDefault;

                $scope.hexagonMarginLeftAndRight = $scope.hexagonMarginLeftAndRightDefault;
                $scope.hexagonMarginTop = $scope.hexagonMarginTopDefault;

                $scope.brightnessInPercentages = $scope.brightnessInPercentagesDefault;
            }

            /*
             * ResetForm() 
             * 
             */

            $scope.ResetForm = function () {
                squareOrHexagonSettings.numberOfRows.value = $scope.numberOfRowsDefault;
                squareOrHexagonSettings.numberOfColumns.value = $scope.numberOfRowsDefault;

                squareOrHexagonSettings.primaryColor.value = $scope.primaryColorDefault;
                squareOrHexagonSettings.secondaryColor.value = $scope.secondaryColorDefault;

                if (squareOrHexagonSettings.squaresOrHexagons.value == "hexagons") {
                    squareOrHexagonSettings.tertiaryColor.value = $scope.tertiaryColorDefault;
                    squareOrHexagonSettings.backgroundColor.value = $scope.backgroundColorDefault;
                    squareOrHexagonSettings.hexagonSize.value = $scope.hexagonSizeDefault;
                } else {
                    squareOrHexagonSettings.squareWidth.value = $scope.squareWidthDefault;
                    squareOrHexagonSettings.squareHeight.value = $scope.squareHeightDefault;

                    squareOrHexagonSettings.brightnessInPercentages.value = $scope.brightnessInPercentagesDefault;
                }
            }

            //Below: predefinedCssColorNames -> an array with 148 predifined CSS color names.
            $scope.predefinedCssColorNames = [
                { colorname: "aliceblue", hex: "F0F8FF" },
                { colorname: "antiquewhite", hex: "FAEBD7" },
                { colorname: "aqua", hex: "00FFFF" },
                { colorname: "aquamarine", hex: "7FFFD4" },
                { colorname: "azure", hex: "F0FFFF" },
                { colorname: "beige", hex: "F5F5DC" },
                { colorname: "bisque", hex: "FFE4C4" },
                { colorname: "black", hex: "000000" },
                { colorname: "blanchedalmond", hex: "FFEBCD" },
                { colorname: "blue", hex: "0000FF" },
                { colorname: "blueviolet", hex: "8A2BE2" },
                { colorname: "brown", hex: "A52A2A" },
                { colorname: "burlywood", hex: "DEB887" },
                { colorname: "cadetblue", hex: "5F9EA0" },
                { colorname: "chartreuse", hex: "7FFF00" },
                { colorname: "chocolate", hex: "D2691E" },
                { colorname: "coral", hex: "FF7F50" },
                { colorname: "cornflowerblue", hex: "6495ED" },
                { colorname: "cornsilk", hex: "FFF8DC" },
                { colorname: "crimson", hex: "DC143C" },
                { colorname: "cyan", hex: "00FFFF" },
                { colorname: "darkblue", hex: "00008B" },
                { colorname: "darkcyan", hex: "008B8B" },
                { colorname: "darkgoldenrod", hex: "B8860B" },
                { colorname: "darkgray", hex: "A9A9A9" },
                { colorname: "darkgrey", hex: "A9A9A9" },
                { colorname: "darkgreen", hex: "006400" },
                { colorname: "darkkhaki", hex: "BDB76B" },
                { colorname: "darkmagenta", hex: "8B008B" },
                { colorname: "darkolivegreen", hex: "556B2F" },
                { colorname: "darkorange", hex: "FF8C00" },
                { colorname: "darkorchid", hex: "9932CC" },
                { colorname: "darkred", hex: "8B0000" },
                { colorname: "darksalmon", hex: "E9967A" },
                { colorname: "darkseagreen", hex: "8FBC8F" },
                { colorname: "darkslateblue", hex: "483D8B" },
                { colorname: "darkslategray", hex: "2F4F4F" },
                { colorname: "darkslategrey", hex: "2F4F4F" },
                { colorname: "darkturquoise", hex: "00CED1" },
                { colorname: "darkviolet", hex: "9400D3" },
                { colorname: "deeppink", hex: "FF1493" },
                { colorname: "deepskyblue", hex: "00BFFF" },
                { colorname: "dimgray", hex: "696969" },
                { colorname: "dimgrey", hex: "696969" },
                { colorname: "dodgerblue", hex: "1E90FF" },
                { colorname: "firebrick", hex: "B22222" },
                { colorname: "floralwhite", hex: "FFFAF0" },
                { colorname: "forestgreen", hex: "228B22" },
                { colorname: "fuchsia", hex: "FF00FF" },
                { colorname: "gainsboro", hex: "DCDCDC" },
                { colorname: "ghostwhite", hex: "F8F8FF" },
                { colorname: "gold", hex: "FFD700" },
                { colorname: "goldenrod", hex: "DAA520" },
                { colorname: "gray", hex: "808080" },
                { colorname: "grey", hex: "808080" },
                { colorname: "green", hex: "008000" },
                { colorname: "greenyellow", hex: "ADFF2F" },
                { colorname: "honeydew", hex: "F0FFF0" },
                { colorname: "hotpink", hex: "FF69B4" },
                { colorname: "indianred", hex: "CD5C5C" },
                { colorname: "indigo", hex: "4B0082" },
                { colorname: "ivory", hex: "FFFFF0" },
                { colorname: "khaki", hex: "F0E68C" },
                { colorname: "lavender", hex: "E6E6FA" },
                { colorname: "lavenderblush", hex: "FFF0F5" },
                { colorname: "lawngreen", hex: "7CFC00" },
                { colorname: "lemonchiffon", hex: "FFFACD" },
                { colorname: "lightblue", hex: "ADD8E6" },
                { colorname: "lightcoral", hex: "F08080" },
                { colorname: "lightcyan", hex: "E0FFFF" },
                { colorname: "lightgoldenrodyellow", hex: "FAFAD2" },
                { colorname: "lightgray", hex: "D3D3D3" },
                { colorname: "lightgrey", hex: "D3D3D3" },
                { colorname: "lightgreen", hex: "90EE90" },
                { colorname: "lightpink", hex: "FFB6C1" },
                { colorname: "lightsalmon", hex: "FFA07A" },
                { colorname: "lightseagreen", hex: "20B2AA" },
                { colorname: "lightskyblue", hex: "87CEFA" },
                { colorname: "lightslategray", hex: "778899" },
                { colorname: "lightslategrey", hex: "778899" },
                { colorname: "lightsteelblue", hex: "B0C4DE" },
                { colorname: "lightyellow", hex: "FFFFE0" },
                { colorname: "lime", hex: "00FF00" },
                { colorname: "limegreen", hex: "32CD32" },
                { colorname: "linen", hex: "FAF0E6" },
                { colorname: "magenta", hex: "FF00FF" },
                { colorname: "maroon", hex: "800000" },
                { colorname: "mediumaquamarine", hex: "66CDAA" },
                { colorname: "mediumblue", hex: "0000CD" },
                { colorname: "mediumorchid", hex: "BA55D3" },
                { colorname: "mediumpurple", hex: "9370DB" },
                { colorname: "mediumseagreen", hex: "3CB371" },
                { colorname: "mediumslateblue", hex: "7B68EE" },
                { colorname: "mediumspringgreen", hex: "00FA9A" },
                { colorname: "mediumturquoise", hex: "48D1CC" },
                { colorname: "mediumvioletred", hex: "C71585" },
                { colorname: "midnightblue", hex: "191970" },
                { colorname: "mintcream", hex: "F5FFFA" },
                { colorname: "mistyrose", hex: "FFE4E1" },
                { colorname: "moccasin", hex: "FFE4B5" },
                { colorname: "navajowhite", hex: "FFDEAD" },
                { colorname: "navy", hex: "000080" },
                { colorname: "oldlace", hex: "FDF5E6" },
                { colorname: "olive", hex: "808000" },
                { colorname: "olivedrab", hex: "6B8E23" },
                { colorname: "orange", hex: "FFA500" },
                { colorname: "orangered", hex: "FF4500" },
                { colorname: "orchid", hex: "DA70D6" },
                { colorname: "palegoldenrod", hex: "EEE8AA" },
                { colorname: "palegreen", hex: "98FB98" },
                { colorname: "paleturquoise", hex: "AFEEEE" },
                { colorname: "palevioletred", hex: "DB7093" },
                { colorname: "papayawhip", hex: "FFEFD5" },
                { colorname: "peachpuff", hex: "FFDAB9" },
                { colorname: "peru", hex: "CD853F" },
                { colorname: "pink", hex: "FFC0CB" },
                { colorname: "plum", hex: "DDA0DD" },
                { colorname: "powderblue", hex: "B0E0E6" },
                { colorname: "purple", hex: "800080" },
                { colorname: "rebeccapurple", hex: "663399" },
                { colorname: "red", hex: "FF0000" },
                { colorname: "rosybrown", hex: "BC8F8F" },
                { colorname: "royalblue", hex: "4169E1" },
                { colorname: "saddlebrown", hex: "8B4513" },
                { colorname: "salmon", hex: "FA8072" },
                { colorname: "sandybrown", hex: "F4A460" },
                { colorname: "seagreen", hex: "2E8B57" },
                { colorname: "seashell", hex: "FFF5EE" },
                { colorname: "sienna", hex: "A0522D" },
                { colorname: "silver", hex: "C0C0C0" },
                { colorname: "skyblue", hex: "87CEEB" },
                { colorname: "slateblue", hex: "6A5ACD" },
                { colorname: "slategray", hex: "708090" },
                { colorname: "slategrey", hex: "708090" },
                { colorname: "snow", hex: "FFFAFA" },
                { colorname: "springgreen", hex: "00FF7F" },
                { colorname: "steelblue", hex: "4682B4" },
                { colorname: "tan", hex: "D2B48C" },
                { colorname: "teal", hex: "008080" },
                { colorname: "thistle", hex: "D8BFD8" },
                { colorname: "tomato", hex: "FF6347" },
                { colorname: "turquoise", hex: "40E0D0" },
                { colorname: "violet", hex: "EE82EE" },
                { colorname: "wheat", hex: "F5DEB3" },
                { colorname: "white", hex: "FFFFFF" },
                { colorname: "whitesmoke", hex: "F5F5F5" },
                { colorname: "yellow", hex: "FFFF00" },
                { colorname: "yellowgreen", hex: "9ACD32" }
            ];
            
        }
    };
});