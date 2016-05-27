/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('CDVDController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    var ytBlocked = false;
    (function () {
        var hiddenImg = document.getElementById('hidden-img');
        hiddenImg.addEventListener('error', function () {
            ytBlocked = true;
        });
    }());

    var rootUrl = '/mobile/json/products/';

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            //noinspection CommaExpressionJS
            return n = n.split('='), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    console.log('[Query Object]', queryObject);

    $scope.data = {
        "content": "Loading...",
        "dateLocation": "Loading..."
    };
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

    }, function () {
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
            var vidData = data[i];

            vidData.logo = "keyboard_arrow_right";
            vidData.index = i;

            if (vidData.youtubeVid === null && vidData.youkuVid === null)
                vidData.logo = 'videocam_off';
        }

        if (data.length !== 0) {
            $scope.videos = data;
        }

        //var fileBase = 'http://video.m4christ.net/seminars/mp4/' + queryObject.label + '/';
        var youkuBase = 'http://player.youku.com/embed/';
        var ytBase = 'https://www.youtube.com/embed/';

        window.mmBox.intercept = function (href) {

            var vidData = data[parseInt(href.replace(document.location.origin + '/', ''))];

            if (!ytBlocked && vidData.youtubeVid !== null) {
                return ytBase + vidData.youtubeVid;
            } else if (vidData.youkuVid !== null) {
                return youkuBase + vidData.youkuVid;
            }

            throw "STOP, WAIT A MINUTE";
        };

        setTimeout(function () {
            window.mmBox.recapture();
        }, 50);
    }, function () {
        msg('Uh Oh! Something went wrong. Please close and open the page.');
    });

    $scope.setInfo = function(title, href) {
        window.mmAP.setInfo({
            title: title,
            href: href,
            update: true,
            open: true
        })
    };

    document.querySelector('#back-button').addEventListener('click', function () {
        window.location.href = "/mobile/media/MFilter.html?filter=" + queryObject.filter;
    });

}]);