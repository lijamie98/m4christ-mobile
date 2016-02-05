/* when window is loaded, initialize it
 * NOTE: with this design, there should only be one */
window.addEventListener('load', function () {

    var mobile = (function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return false;
        }

        return true;
    }());

    var $maSlide = $('.ma-controls-slider');

    // pc AKA. progressBar or "personal best" (inside joke)
    var $pb = $('.ma-controls-slider--progress', $maSlide);

    // ct AKA. currentTime
    var $ct = $('.ma-controls-time--current-time');

    // dt AKA. duration
    var $dt = $('.ma-controls-time--duration');

    // When progress circle is touched
    $maSlide.on('mousedown touchstart', function (e) {

        // set boolean for if the audio was paused or not before seeking
        var beforePaused = audio.paused;

        // pause audio for smooth seeking
        audio.pause();

        // move the circle when clicked
        moveCircle(e);

        // pa AKA. progressCircle
        var $pc = $('.ma-controls-slider--progress-circle', $maSlide);

        // change some classes on pc to a pressed state
        $pc[0].className = "mdl-color--accent mdl-shadow--4dp ma-controls-slider--progress-circle pressed";

        // get offsetLeft of pb();
        var pbLeft = getOffsetLeft($pb[0]);

        // Move the circle n' seek
        document.documentElement.on('mousemove touchmove', moveCircle);

        function moveCircle(e) {
            $pb[0].style.width = (((e.clientX || e.touches[0].clientX) - pbLeft) / $maSlide[0].offsetWidth) * 100 + '%';
        }

        function detachMove(e) {
            // Detach the listener and itself
            this.off('mousemove touchmove', moveCircle);
            this.off('mouseup touchend', detachMove);

            // change some classes on 'pc'
            $pc[0].className = "mdl-color--accent mdl-shadow--2dp ma-controls-slider--progress-circle";

            // update slider position and seek to slider position
            moveCircle(e);
            audio.currentTime = audio.duration * ($pb[0].style.width.replace('%', '') / 100);

            // play if beforePaused is false
            if (!beforePaused)
                audio.play();
        }

        document.documentElement.on('mouseup touchend', detachMove);

        DOY();

        // http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
        function getOffsetLeft(elem) {
            var offsetLeft = 0;
            do {
                if (!isNaN(elem.offsetLeft)) {
                    offsetLeft += elem.offsetLeft;
                }
            } while (elem = elem.offsetParent);
            return offsetLeft;
        }
    });

    /* Audio interaction methods */

    var iconText = {
        "rewind": "fast_rewind",
        "play": "play_arrow",
        "pause": "pause",
        "forward": "fast_forward",
        "previous": "skip_previous",
        "stop": "stop",
        "next": "skip_next"
    };

    var audio = _s('.ma-audio');

    // mc AKA. mainControls
    var mc = _s('.ma-icon-controls--main-controls');

    var rewind = mc._s('.ma-icon-controls--rewind');

    // pp AKA. playPause
    var pp = mc._s('.ma-icon-controls--play-pause');

    // ff AKA. fastForward
    var ff = mc._s('.ma-icon-controls--fast-forward');

    // sc AKA. secondaryControls
    var sc = _s('.ma-icon-controls--secondary-controls');

    var stop = sc._s('.ma-icon-controls--stop');

    DOY(stop);

    /* Icon click events */

    // when rewind is clicked, rewind by 10 seconds
    rewind.on('click', function () {
        audio.rewind(10);
    });

    // when pp is clicked, play or pause respective to audio.paused status
    pp.on('click', function () {
        if (audio.paused)
            audio.play();
        else
            audio.pause();
    });

    // when ff is clicked, rewind by 10 seconds
    ff.on('click', function () {
        audio.fastForward(10);
    });

    // when stop is clicked, reload the audio
    stop.on('click', function () {
        // Reset controls
        pp.children[0].innerText = iconText.play;
        $pb[0].style.width = "0%";
        $ct[0].innerText = "00:00";

        // Load it again
        audio.load();
    });

    /* Independent Events */

    // when playing, change pp's icon to pause
    audio.on('play playing', function () {
        pp.children[0].innerText = iconText.pause;
    });

    // when paused, change pp's icon to play
    audio.on('pause waiting', function () {
        pp.children[0].innerText = iconText.play;
    });

    // when audio progress changes, change slider position
    audio.on('timeupdate progress', function () {

        DOY('Time Update');

        $ct[0].innerText = formatSeconds(audio.currentTime);
        $pb[0].style.width = ((audio.currentTime / audio.duration) * 100) + "%";
    });

    // when audio can play, update several things
    audio.on('canplay', function() {
        $dt[0].innerText = formatSeconds(audio.duration);
        $pb[0].style.width = '0%';
    });

    /* Audio methods */

    // rewind by n number of seconds
    HTMLAudioElement.prototype.rewind = function (n) {
        this.currentTime = this.currentTime - 10;
    };

    // fast forward by n number of seconds
    HTMLAudioElement.prototype.fastForward = function (n) {
        this.currentTime = this.currentTime + 10;
    };

    /* DOM and misc. methods */
    function formatSeconds(s) {
        var s = Math.floor(s);

        var seconds = s % 60;
        var minutes = (s - seconds) / 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

    formatSeconds(246);

    function _s(s) {
        return document.querySelector(s);
    }

    function _sa(s) {
        return document.querySelectorAll(s);
    }

    function DOY(s) {
        console.log('[DOY]', s || 'DOY');
    }
});

HTMLElement.prototype._s = function (s) {
    return this.querySelector(s);
};

HTMLElement.prototype._sa = function (s) {
    return this.querySelectorAll(s);
};

HTMLElement.prototype.on = function (events, callback) {
    var element = this;

    events.split(' ').forEach(function (event) {
        element.addEventListener(event, callback);
    });
};

HTMLElement.prototype.off = function (events, method) {
    var element = this;

    events.split(' ').forEach(function (event) {
        element.removeEventListener(event, method);
    });
};