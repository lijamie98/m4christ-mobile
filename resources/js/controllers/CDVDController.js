/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('CDVDController', ['$scope', '$http', function ($scope, $http) {

    $scope.title = "Title";

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            return n = n.split('='), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    console.log('[Query Object]', queryObject);

    document.querySelector('#back-button').addEventListener('click', function() {
        document.location.href = "/mobile/media/MFilter.html?filter=" + queryObject.filter;
    });
}]);