/**
 * Created by Samuel on 2/2/2016.
 */

mainApp.controller('InfoController', ['$scope', '$sce', function ($scope, $sce) {

    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            //noinspection CommaExpressionJS
            return n = n.split('='), this[n[0]] = n[1], this
        }.bind({}))[0];
    }());

    $scope.foSrc = "/web/seminars/" + queryObject.path;
    $scope.src = $sce.trustAsResourceUrl($scope.foSrc);

    $scope.title = "Loading...";
    document.getElementById('frame').addEventListener('load', function () {
        var contentDocument = this.contentDocument;

        $scope.title = contentDocument.title;
        $scope.$apply();

        //var head = document.createElement("head");
        //<meta name="viewport" content="width=device-width, initial-scale=1">
        //var meta = document.createElement("meta");
        //meta.name = "viewport";
        //meta.content = "width=device-width, initial-scale=1";
        //head.appendChild(meta);
        //console.log(contentDocument.firstChild.appendChild(head));

        contentDocument.body.style.overflow = "auto";

        return null;
    });

    document.querySelector('#back-button').addEventListener('click', function () {
        window.location.href = '/mobile/seminar.html';
    });
}]);