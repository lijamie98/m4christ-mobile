/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('InfoController', ['$scope', '$sce', function ($scope, $sce) {

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            return n = n.split('='), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    $scope.foSrc = "/web/seminars/" + queryObject.path;
    $scope.src = $sce.trustAsResourceUrl($scope.foSrc);

    $scope.title = "Loading...";
    document.getElementById('frame').addEventListener('load', function() {
        $scope.title = this.contentDocument.title;
        $scope.$apply();
        return null;
    });

    document.querySelector('#back-button').addEventListener('click', function () {
        if (window.self !== window.top)
            window.parent.postMessage('closeFrame', '*');
        else
            window.location.href = '/mobile/seminar.html';
    });
}]);