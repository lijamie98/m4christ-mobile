/**
 * Created by samuel on 2/18/16.
 */

mainApp.controller('PlaylistsController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "耶穌是主 - 線上播放";

    var imgTemplateUrl = 'http://static.m4christ.net/products/{0}/{1}-ths.jpg';

    // http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    String.prototype.format = function () {
        var formatted = this;
        for (var arg in arguments) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    $scope.close = function () {
        if (window.self !== window.top)
            window.parent.postMessage('closeFrame', '*');
        else
            window.location.href = '/mobile/praise.html';
    };

    $http({
        method: 'GET',
        url: 'http://m.m4christ.net/mobile/json/products/_filter/P'
    }).then(function (response) {
        var data = response.data;

        console.log('[Products]', data);

        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            var currentData = data[i];
            currentData.imageURL = imgTemplateUrl.format(currentData.label, currentData.label);
        }

        console.log('[Example Product Data]', data[0]);

        $scope.products = data;
    }, function (response) {
        msg('Uh oh! Something went wrong. Please close and open the page again!</br>' + response.data);
    });
}]);