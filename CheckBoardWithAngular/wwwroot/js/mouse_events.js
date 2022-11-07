app.directive('mouseEventMenu', function () {
    return {
        restrict: "A",

        controller: function ($scope) {
            $scope.menuDefault = 'images/menu-line.png';
            $scope.menuHighlighted = 'images/menu-line-highlighted.png';

            $scope.menuItemCurrent = $scope.menuDefault;

            /*
             * menuItemMouseEnter() - Changes image when mouse enters.
             * 
             */

            $scope.menuItemMouseEnter = function() {
                $scope.menuItemCurrent = $scope.menuHighlighted;
            }

            /*
             * menuItemMouseLeave() - Changes image when mouse leaves.
             * 
             */

            $scope.menuItemMouseLeave = function () {
                $scope.menuItemCurrent = $scope.menuDefault;
            }

        }
    };
});