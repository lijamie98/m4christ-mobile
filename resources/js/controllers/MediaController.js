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

    window.addEventListener("message", receiveMessage);

    function receiveMessage(event) {
        var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        if (origin !== window.location.origin)
            return;

        var data = event.data;

        if (event.data == 'closeFrame') {
            mediaFrame.close();
        }
    }
}]);