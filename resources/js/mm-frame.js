/**
 * Created by samuel on 2/17/16.
 */

window.globalFrame = new Frame();

window.addEventListener('load', function () {
    var iFrameContainerContents = '<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>' +
        '<iframe class="mm-iframe--iframe" allowfullscreen allowtransparency></iframe>';

    var iFrameContainer = document.createElement('div');

    iFrameContainer.className = 'mm-iframe--container';
    iFrameContainer.innerHTML = iFrameContainerContents;

    document.body.appendChild(iFrameContainer);
    window.globalFrame.updateElements();
});

function Frame() {
    var iFrameContainer;
    var iFrame;

    var openOnMessage = false;

    var themeColor;
    var frameObj = this;

    window.addEventListener('load', this.updateElements);

    this.updateElements = function() {
        iFrameContainer = document.querySelector('.mm-iframe--container');
        iFrame = document.querySelector('.mm-iframe--iframe');

        themeColor = document.querySelectorAll('.mm-theme-color');
    };

    this.open = function (href, callback) {
        if (iFrameContainer == undefined) {
            frameObj.updateElements();
        }

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

                    openCode(callback);
                    window.removeEventListener('message', messageOpen);

                    changeBarColor('#ffffff');
                }
            } else {
                setTimeout(function () {
                    iFrameContainer.classList.add('open');
                    iFrameContainer.classList.remove('ready');

                    openCode(callback);
                    changeBarColor('#ffffff');
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

    function openCode(callback) {

        iFrame.contentWindow.addEventListener('unload', onUnload);
        iFrame.addEventListener('load', onLoad);

        function onLoad() {
            iFrameContainer.classList.remove('ready');
            iFrame.contentWindow.removeEventListener('load', onLoad);

            if (callback != undefined)
                callback();
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
        return iFrameContainer;
    };

    this.getIframe = function () {
        return iFrame;
    };

    this.changeOpenOnMessage = function (bool) {
        if (typeof bool == 'boolean')
            openOnMessage = bool;
    }

    window.addEventListener("message", receiveMessage);

    function receiveMessage(event) {
        var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        if (origin !== window.location.origin)
            return;

        var data = event.data;

        if (event.data == 'closeFrame') {
            frameObj.close();
        }
    }
}