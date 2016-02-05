/**
 * Created by Samuel on 1/12/2016.
 */

mainApp.controller("MediaController", ["$scope", function ($scope) {
    var iFrameContainer = document.querySelector('.media-iframe--container');
    var iFrame = document.querySelector('.media-iframe--iframe');

    var listItems = document.querySelectorAll('.mm-list--item');
    var listItemsLength = listItems.length;

    for (var i = 0; i < listItemsLength; i++) {
        listItems[i].addEventListener('click', function (e) {
            e.preventDefault();

            iFrameContainer.classList.add('ready');

            iFrame.src = this.getAttribute('href');

            function onFrameLoad() {
                iFrameContainer.classList.add('open');

                iFrame.removeEventListener('load', onFrameLoad);
            }
            iFrame.addEventListener('load', onFrameLoad);
        });
    }
}])
;