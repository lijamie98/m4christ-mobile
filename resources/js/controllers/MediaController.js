/**
 * Created by Samuel on 1/12/2016.
 */

mainApp.controller("MediaController", ["$scope", function ($scope) {
    var iFrameContainer = document.querySelector('.media-iframe--container');
    var iFrame = document.querySelector('.media-iframe--iframe');

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

function Frame() {
    var iFrameContainer;
    var iFrame;

    var openOnMessage = false;

    var themeColor;

    window.addEventListener('load', function () {
        iFrameContainer = document.querySelector('.media-iframe--container');
        iFrame = document.querySelector('.media-iframe--iframe');

        themeColor = document.querySelectorAll('.mm-theme-color');
    });

    this.open = function (href) {
        iFrameContainer.classList.remove('close');

        iFrameContainer.classList.add('ready');

        iFrame.src = href;

        function onFrameLoad() {
            if (openOnMessage) {

                window.addEventListener('message', messageOpen);

                function messageOpen(e) {

                    var origin = e.origin || e.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
                    if (origin !== window.location.origin)
                        return;

                    var data = e.data;

                    if (e.data == 'openFrame') {
                        iFrameContainer.classList.add('open');
                        iFrameContainer.classList.remove('ready');
                    }

                    openCode();
                    window.removeEventListener('message', messageOpen);

                    changeBarColor('#ffffff');
                }
            } else {
                setTimeout(function () {
                    iFrameContainer.classList.add('open');
                    iFrameContainer.classList.remove('ready');

                    openCode();
                }, 256);
            }

            iFrame.removeEventListener('load', onFrameLoad);
        }

        iFrame.addEventListener('load', onFrameLoad);
    }

    this.close = function () {
        iFrameContainer.classList.remove('ready', 'open');
        iFrameContainer.classList.add('close');

        iFrameContainer.addEventListener('animationend', onAnimationEnd);

        changeBarColor('#283593');
        function onAnimationEnd() {
            iFrame.src = '';

            iFrame.removeEventListener('unload', onUnload);
            iFrameContainer.removeEventListener('animationend', onAnimationEnd);
        }
    }

    function openCode() {

        iFrame.contentWindow.addEventListener('unload', onUnload);
        iFrame.addEventListener('load', onLoad);

        function onLoad() {
            iFrameContainer.classList.remove('ready');
            iFrame.contentWindow.removeEventListener('load', onLoad);
        }
    }

    function onUnload() {
        iFrameContainer.classList.add('ready');
    }

    function changeBarColor(hex) {
        for (var i = 0; i < themeColor.length; i++) {
            themeColor[i].setAttribute('content', hex);
        }
    }

    this.getIframeContainer = function () {
        return iFrameContainer
    };

    this.getIframe = function () {
        return iFrame
    };

    this.changeOpenOnMessage = function (bool) {
        if (typeof bool == 'boolean')
            openOnMessage = bool;
    }
}