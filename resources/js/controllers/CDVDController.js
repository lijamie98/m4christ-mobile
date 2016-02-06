/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('CDVDController', ['$scope', '$http', function ($scope, $http) {

    $scope.title = "Title";

    document.querySelector('#back-button').addEventListener('click', function() {
        window.history.back();
    });
}]);