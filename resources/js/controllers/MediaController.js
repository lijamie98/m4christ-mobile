/**
 * Created by Samuel on 1/12/2016.
 */

mainApp.controller("MediaController", ["$scope", function ($scope) {
    var iFrameContainer = document.querySelector('.media-iframe--container');
    var iFrame = document.querySelector('.media-iframe--iframe');

    var listItems = document.querySelectorAll('.mm-list--item');
    var listItemsLength = listItems.length;

    var mediaFrame = new Frame();

    for (var i = 0; i < listItemsLength; i++) {
        listItems[i].addEventListener('click', function (e) {
            e.preventDefault();

            mediaFrame.open(this.getAttribute('href'));
        });
    }

    window.addEventListener("message", receiveMessage, false);

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

function Frame() {
    var iFrameContainer;
    var iFrame;

    window.addEventListener('load', function() {
        iFrameContainer = document.querySelector('.media-iframe--container');
        iFrame = document.querySelector('.media-iframe--iframe');
    });

    this.open = function(href) {
        iFrameContainer.classList.remove('close');

        iFrameContainer.classList.add('ready');

        iFrame.src = href;

        function onFrameLoad() {
            iFrameContainer.classList.add('open');
            iFrameContainer.classList.remove('ready');

            openCode();
            iFrame.removeEventListener('load', onFrameLoad);
        }
        iFrame.addEventListener('load', onFrameLoad);
    }

    this.close = function() {
        iFrameContainer.classList.remove('ready', 'open');
        iFrameContainer.classList.add('close');

        iFrameContainer.addEventListener('animationend', onAnimationEnd);

        function onAnimationEnd() {
            iFrame.src='';

            iFrame.removeEventListener('unload', onUnload);
            iFrameContainer.removeEventListener('animationend', onAnimationEnd);
        }
    }

    function openCode() {

        iFrame.addEventListener('unload', onUnload);
        iFrame.addEventListener('load', onLoad);

        function onLoad() {
            iFrameContainer.classList.remove('ready');
            iFrame.removeEventListener('load', onLoad);
        }
    }

    function onUnload() {
        console.log('test');

        iFrameContainer.classList.add('ready');
    }

    this.getIframeContainer = function() {
        return iFrameContainer
    };

    this.getIframe = function() {
        return iFrame
    };
}