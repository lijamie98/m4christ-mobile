/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('MFilterController', ['$scope', '$http', function ($scope, $http) {

    var rootUrl = '/web-rest/json/products/_filter/';

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

    var titles = {
        "M1": "靈命初期",
        "M2": "靈命成長期",
        "M3": "靈命煉淨期",
        "M4": "靈命成熟期"
    };

    $scope.title = titles[queryObject.filter];
    $scope.filter = queryObject.filter;

    $scope.items = [{
        "name": "請稍後． ． ．",
        "label": "",
        "contents": ""
    }];

    $http({
        method: 'GET',
        url: rootUrl + queryObject.filter
    }).then(function (response) {
        var data = response.data;

        console.log('[Data]', data);
        console.log('[Example Data]', data[0]);

        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            var item = data[i];
            if (item.hasYouKuVideo || item.hasYouTubeVideo) {
                item.color = "mdl-color-text--green-500";
                item.icon = "videocam";
            } else
                item.icon = "keyboard_arrow_right";
        }

        $scope.items = data;
        document.querySelector(".ma-load-cover").classList.add("hide");
    }, function (response) {
    });

    $scope.open = function (filter, label) {
        window.location.href = '/mobile/media/CDVD.html?filter=' + filter + '&label=' + label;
    };

    document.querySelector('#back-button').addEventListener('click', function () {
        window.location.href = '/mobile/media.html';
    });
}]);