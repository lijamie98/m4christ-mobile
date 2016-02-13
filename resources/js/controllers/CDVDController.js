/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('CDVDController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    var rootUrl = 'http://m.m4christ.net/mobile/json/products/';

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            return n = n.split('='), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    console.log('[Query Object]', queryObject);

    $scope.data = {};
    $scope.videos = [{
        href: "",
        title: "沒有影片",
        logo: "videocam_off"
    }];

    $http({
        method: 'GET',
        url: rootUrl + queryObject.label
    }).then(function (response) {
        var data = response.data;

        console.log('[' + data.label + ' Data]', data);

        console.log('[Example MP3 Data]', data.mp3URLs[0]);

        data.title = '(' + data.label + ') ' + data.name;
        if (data.introduction === null)
            data.introduction = '沒有簡介';

        // http://stackoverflow.com/questions/9381926/angularjs-insert-html-into-view
        $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml(data.introduction);

        $scope.data = data;

    }, function (response) {
        msg('Uh Oh! Something went wrong. Please close and open the page.');
    });

    $http({
        method: 'GET',
        url: rootUrl + queryObject.label + '/_video'
    }).then(function (response) {
        var data = response.data;

        console.log('[' + queryObject.label + ' Video Data]', data);

        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            data[i].href = "";
            data[i].logo = "keyboard_arrow_right";
        }

        if (data.length !== 0) {
            $scope.videos = data;
        }
    }, function (response) {
        msg('Uh Oh! Something went wrong. Please close and open the page.');
    });

    document.querySelector('#back-button').addEventListener('click', function() {
        document.location.href = "/mobile/media/MFilter.html?filter=" + queryObject.filter;
    });

}]);