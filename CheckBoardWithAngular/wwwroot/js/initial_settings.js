app.directive('initialSettings', function () {
    return {
        restrict: "A",

        controller: function ($scope) {

            /*
             * Initial settings.
             * 
             */

            $scope.menuContentVisible = true;

            $scope.numberOfRows = 8;
            $scope.numberOfColumns = 8;

            $scope.squaresOrHexagons = 'squares';

            $scope.primaryColor = $scope.primaryColorDefault;
            $scope.secondaryColor = $scope.secondaryColorDefault;
            $scope.tertiaryColor = $scope.tertiaryColorDefault;
            $scope.backgroundColor = $scope.backgroundColorDefault;

            $scope.squareWidth = $scope.squareWidthDefault;
            $scope.squareHeight = $scope.squareHeightDefault;

            $scope.hexagonSize = $scope.hexagonSizeDefault;

            $scope.borderOfContent = $scope.borderOfContentDefault;

            $scope.totalWidth = 0;
            $scope.totalHeight = 0;

            $scope.brightnessInPercentages = 0;
        }
    };
});