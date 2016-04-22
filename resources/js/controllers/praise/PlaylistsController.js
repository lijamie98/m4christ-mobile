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

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            return n = n.split('='), this[n[0]] = n[1], this;
        }.bind({}))[0];
    }());

    var rootUrlTemplate = "http://m.m4christ.net/mobile/json/products/_filter/{0}";

    var url = rootUrlTemplate.format(queryObject.filter);

    $scope.showIntro = (function () {
        if (queryObject.hideIntro === 'true')
            return false;

        return true;
    }());

    var urlTemplate = (function () {
        if (queryObject.play === 'true')
            return "/mobile/praise/play.html?label={0}";

        return "/mobile/praise/product.html?label={0}&prev={1}";
    }());

    console.log(urlTemplate);

    $http({
        method: 'GET',
        url: url
    }).then(function (response) {
        var data = response.data;

        console.log('[Products]', data);

        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            var currentData = data[i];

            var label = currentData.labelWeb;
            currentData.imageURL = imgTemplateUrl.format(label, label);
            currentData.href = urlTemplate.format(label, queryObject.filter);
        }

        console.log('[Example Product Data]', data[0]);

        $scope.products = data;
    }, function (response) {
        msg('Uh oh! Something went wrong. Please close and open the page again!</br>' + response.data);
    });

    //globalFrame.changeOpenOnMessage(true);

    $scope.open = function (href) {
        globalFrame.open(href);
    };

    $scope.close = function () {
        window.location.href = '/mobile/praise.html';
    };
}]);