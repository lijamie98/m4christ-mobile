/**
 * Created by samuel on 2/18/16.
 */

mainApp.controller('ProductController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    var rootUrl = 'http://m.m4christ.net/mobile/json/products/';

    $scope.staticRootURL = 'http://static.m4christ.net/products/P008CD/';

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            return n = n.split('='), this[n[0]] = n[1], this;
        }.bind({}))[0];
    }());

    $scope.title = queryObject.label;

    $http({
        method: 'GET',
        url: rootUrl + queryObject.label
    }).then(function (response) {
        var data = response.data;

        console.log('[Product Data]', data);

        $scope.bindHtml = $sce.trustAsHtml(data.introduction);

        $scope.product = data;
    }, function (response) {
        msg('Uh oh! Something went wrong. Please close and open the page again!</br>' + response.data);
    });

    $scope.close = function () {
        if (queryObject.prev == "close")
            window.location.href = "/mobile/praise.html";
        else
            window.location.href = '/mobile/praise/playlists.html?filter=' + queryObject.prev + '&hideIntro=true';
    };
}]);