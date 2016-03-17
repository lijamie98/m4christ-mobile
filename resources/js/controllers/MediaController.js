/**
 * Created by Samuel on 1/12/2016.
 */

mainApp.controller("MediaController", ["$scope", function ($scope) {

    var listItems = document.querySelectorAll('.mm-list--item');
    var listItemsLength = listItems.length;

    var mediaFrame = new Frame();

    mediaFrame.changeOpenOnMessage(true);

    $scope.open = function (href) {
        mediaFrame.open(href);
    };
}]);