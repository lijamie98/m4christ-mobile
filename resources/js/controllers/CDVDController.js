/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('CDVDController', ['$scope', '$http', function ($scope, $http) {

    $scope.title = "Title";

    var rootUrl = "http://m.m4christ.net/mobile/json/products/_filter/";

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split("&").map(function (n) {
            return n = n.split("="), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    //                  automatically converts to int when subtracting one
    queryObject.index = queryObject.label.substring(2) - 1;

    console.log(queryObject);
    $http({
        method: 'GET',
        url: rootUrl + queryObject.filter
    }).then(function (response) {
        var filteredData = response.data[queryObject.index];

        console.log('[Filtered Data]', filteredData);

        $scope.information = filteredData;
    }, function (response) {
    });
}]);