/**
 * Created by Samuel on 1/9/2016.
 */
mainApp.controller('NavigationController', ['$scope', function ($scope) {
    $scope.title = pageSettings.name;

    document.getElementById('title').innerText = pageSettings.name;
}]);