/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('DVDController', ['$scope', '$http', function ($scope, $http) {

    var rootUrl = 'http://m.m4christ.net/mobile/json/products/_filter/';

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            return n = n.split('='), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    console.log(queryObject);

    $scope.title = queryObject.filter + 'DVD';

    $http({
        method: 'GET',
        url: rootUrl + queryObject.filter
    }).then(function (response) {
        var data = response.data;

        var dvdData = (function() {
            var dataLength = data.length;

            var newData = [];

            for (var i = 0; i < dataLength; i++) {
                var currentData = data[i];

                if (currentData.label.substring(4) == 'DVD') {
                    console.log('[Found DVD Data]', currentData.label);

                    newData.push(currentData);
                }
            }

            return newData;
        }());

        console.log('[Filtered DVD Data]', dvdData);
        console.log('[Example Data]', dvdData[0]);

        $scope.dvds = dvdData;
    }, function (response) {
    });

    document.querySelector('#back-button').addEventListener('click', function() {
        window.parent.postMessage('closeFrame', '*');
    });
}]);