/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('MFilterController', ['$scope', '$http', function ($scope, $http) {

    var rootUrl = '/mobile/json/products/_filter/';

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            //noinspection CommaExpressionJS
            return n = n.split('='), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    if (queryObject.filter == undefined)
        queryObject.filter = 'M1';

    console.log('[Query Object]', queryObject);

    $scope.title = queryObject.filter;
    $scope.filter = queryObject.filter;

    $http({
        method: 'GET',
        url: rootUrl + queryObject.filter
    }).then(function (response) {
        var data = response.data;

        console.log('[Data]', data);
        console.log('[Example Data]', data[0]);

        $scope.items = data;
    }, function (response) {
    });

    $scope.open = function (filter, label) {
        window.location.href = '/mobile/media/CDVD.html?filter=' + filter + '&label=' + label;
    };

    document.querySelector('#back-button').addEventListener('click', function () {
        window.location.href = '/mobile/media.html';
    });
}]);