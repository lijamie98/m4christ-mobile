/**
 * Created by samuel on 2/17/16.
 */

function Frame() {
    var iFrameContainer;
    var iFrame;

    var openOnMessage = false;

    var themeColor;

    window.addEventListener('load', function () {
        iFrameContainer = document.querySelector('.mm-iframe--container');
        iFrame = document.querySelector('.mm-iframe--iframe');

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