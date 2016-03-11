/**
 * Created by Samuel on 1/12/2016.
 */

mainApp.controller("MediaController", ["$scope", function ($scope) {

    var listItems = document.querySelectorAll('.mm-list--item');
    var listItemsLength = listItems.length;

    var mediaFrame = new Frame();

    mediaFrame.changeOpenOnMessage(true);

    for (var i = 0; i < listItemsLength; i++) {
        listItems[i].addEventListener('click', function (e) {
            e.preventDefault();

            mediaFrame.open(this.getAttribute('href'));
        });
    }
}]);