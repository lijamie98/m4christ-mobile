/**
 * Created by samuel on 2/18/16.
 */

mainApp.controller('SongsController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "耶穌是主 - 線上播放";

    // http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    String.prototype.format = function () {
        var formatted = this;
        for (var arg in arguments) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    //globalFrame.changeOpenOnMessage(true);

    $scope.lists = (function () {
        var songs = 500;
        var lists = [];

        var iterations = songs / 50;

        for (var i = 1; i <= iterations; i++) {
            var number = i * 50;
            lists.push({
                "start": number - 49,
                "end": number
            });
        }

        return lists;
    }());

    var urlTemplate = '/mobile/praise/play.html?start={0}&end={1}';
    $scope.open = function (start, end) {
        window.location.href = urlTemplate.format(start, end);
    };

    $scope.close = function () {
        window.location.href = '/mobile/praise.html';
    };
}]);