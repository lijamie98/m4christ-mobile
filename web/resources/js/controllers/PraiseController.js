/**
 * Created by samuel on 2/16/16.
 */

mainApp.controller('PraiseController', ['$scope', function ($scope) {
    $scope.exampleCD = {
        'label': 'P008CD',
        'name': '「在天上除你以外，為我還能有誰！」音樂CD－和風音樂詩歌（八）',
        'contents': '精選17首「風中傳愛」詩歌集音樂光碟。'
    };

    var imgTemplateUrl = 'http://static.m4christ.net/products/{0}/{1}-ths.jpg';

    // http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    String.prototype.format = function () {
        var formatted = this;
        for (var arg in arguments) {
            //noinspection JSUnfilteredForInLoop
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    $scope.exampleCD.imageURL = imgTemplateUrl.format($scope.exampleCD.label, $scope.exampleCD.label);

    //window.addEventListener("message", receiveMessage);

    //var praiseFrame = new Frame();
    //
    //praiseFrame.changeOpenOnMessage(true);
    //
    //function receiveMessage(event) {
    //    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    //    if (origin !== window.location.origin)
    //        return;
    //
    //    var data = event.data;
    //
    //    if (event.data == 'closeFrame') {
    //        praiseFrame.close();
    //    }
    //}
    //
    //$scope.open = function (href) {
    //    praiseFrame.open(href);
    //};
}]);