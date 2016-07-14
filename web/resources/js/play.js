/* when window is loaded, initialize it
 * NOTE: with this design, there should only be one */
$(function () {

    window.player = this;

    var mobile = (function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }());

    var getPositionX;
    (function () {
        if (mobile) {
            getPositionX = function (e) {
                return e.originalEvent.touches[0].clientX;
            };
        }
        else
            getPositionX = function (e) {
                return e.clientX;
            };

    }());

    var $maSlide = $('.ma-controls-slider');

    // pc AKA. progressBar or "personal best" (inside joke)
    var $pb = $('.ma-slider--progress', $maSlide);

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

        var $slider = $(this);
        var $progress = $pb; // pass reference to $pb for compataibility with poc-slider
        var $document = $(document);

        var offsetLeft = $(this).offset().left;
        var sliderWidth = $slider.width();

        $('.slider-progress-circle', $progress).addClass('pressed');

        //var audioDuration = audio.duration; unused
        moveCircle(e);

        function moveCircle(e) {
            e.preventDefault();
            var rawValue = (getPositionX(e) - offsetLeft) / sliderWidth;
            $progress.css('width', (rawValue * 100) + '%');
            audio.currentTime = audio.duration * ($pb[0].style.width.replace('%', '') / 100);
        }

        $document.on('mousemove touchmove', function (e) {
            moveCircle(e);
        });

        $document.one('mouseup touchend', function () {
            $('.slider-progress-circle', $progress).removeClass('pressed');

            audio.currentTime = audio.duration * ($pb[0].style.width.replace('%', '') / 100);

            // play if beforePaused is false
            if (!beforePaused)
                audio.play();
            $document.off('mousemove touchmove');
        });
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

    // pp AKA. playPause
    var pp = mc._s('.ma-icon-controls--play-pause');

    var prev = mc._s('.ma-icon-controls--prev');

    var stop = mc._s('.ma-icon-controls--stop');

    var next = mc._s('.ma-icon-controls--next');

    /* Icon click events */

    // when pp is clicked, play or pause respective to audio.paused status
    pp.on('click', function () {
        if (audio.paused)
            audio.play();
        else
            audio.pause();
    });

    // when prev is clicked, go back a song
    prev.on('click', function () {
        player.changeSong(currentIndex - 1);
    });

    // when stop is clicked, reload the audio
    stop.on('click', reset);

    next.on('click', function () {
        player.changeSong(currentIndex + 1);
    });

    /* Independent Events */

    var mainObj = this;
    // when playing, change pp's icon to pause
    audio.on('play playing', function () {
        pp.children[0].innerText = iconText.pause;
        mainObj.removeArrow();
    });

    // when paused, change pp's icon to play
    audio.on('pause waiting', function () {
        pp.children[0].innerText = iconText.play;
    });

    // when audio progress changes, change slider position
    audio.on('timeupdate progress', function () {
        $ct[0].innerText = formatSeconds(audio.currentTime);
        $pb[0].style.width = ((audio.currentTime / audio.duration) * 100) + "%";
    });

    // when audio can play, update several things
    audio.on('canplay', canplay);

    function canplay() {
        $dt[0].innerText = formatSeconds(audio.duration);
        $pb[0].style.width = '0%';

        setTimeout(function () {
            audio.play();
        }, 500);
    }

    if (audio.readyState > 3) {
        canplay();
    }

    audio.on('ended', function () {
        player.changeSong(currentIndex + 1);
    });

    /* Audio methods */

    /* DOM and misc. methods */
    function formatSeconds(s) {
        //noinspection JSDuplicatedDeclaration
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

    function _s(s) {
        return document.querySelector(s);
    }

    // unused
    //function _sa(s) {
    //    return document.querySelectorAll(s);
    //}

    /**
     * @return {string}
     */
    function DOY(s) {
        var doy = '[DOY] ' + (s || 'DOY');

        console.log(doy);
        return doy;
    }

    // Playlist Time

    function reset() {
        // Reset controls
        pp.children[0].innerText = iconText.play;
        $pb[0].style.width = "0%";
        $ct[0].innerText = "00:00";

        // Load it again
        audio.load();
        audio.pause();
    }

    // http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    var queryObject;
    String.prototype.format = function () {
        var formatted = this;
        for (var arg in arguments) { //noinspection JSUnfilteredForInLoop
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };
    var currentIndex;
    (function () {

        var playlist = document.querySelector('.ma-playlist');

        // https://css-tricks.com/snippets/jquery/get-query-params-object/
        queryObject = (function () {
            return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
                //noinspection CommaExpressionJS
                return n = n.split('='), this[n[0]] = n[1], this;
            }.bind({}))[0];
        }());

        var url = (function () {
            if (queryObject.label == undefined && queryObject.end == undefined)
                return '/mobile/json/songs?start=1&end=49';

            var songsTemplate = '/mobile/json/songs?start={0}&end={1}';
            var labelTemplate = '/mobile/json/products/{0}/_songs';

            if (queryObject.label != undefined)
                return labelTemplate.format(queryObject.label);

            return songsTemplate.format(queryObject.start, queryObject.end);
        }());

        var data = [];

        var playlistItemTemplate = '<div class="mm-list--item-text">' +
            '   <span class="mm-list--item-text-title">{0}</span>' +
            '   <span class="mm-list--item-text-subtitle">({1}) {2}</span>' +
            '</div>' +
            '<div class="mm-list--icon-right material-icons">keyboard_arrow_right</div>';
        var mp3Template = 'http://static.m4christ.net/music/audio/mp3.studio/{0}';

        $.ajax({
            url: url,
            success: function (response) {
                data = response;

                console.log('[Song Data]', response);
                console.log('[Example Song Data]', response[0]);

                var dataLength = data.length;
                for (var i = 0; i < dataLength; i++) {
                    var song = data[i];

                    var songElement = document.createElement('a');
                    songElement.className = "mdl-cell mm-list--item mdl-js-ripple-effect";
                    songElement.href = 'javascript:player.changeSong(' + i + ');';

                    songElement.innerHTML = playlistItemTemplate.format(song.songName, song.songNumber, song.songAuthor);

                    var rippleElement = document.createElement('span');
                    rippleElement.className = "mdl-ripple";

                    songElement.appendChild(rippleElement);

                    componentHandler.upgradeElement(songElement);
                    // append
                    playlist.appendChild(songElement);

                    playlistItems[i] = songElement;
                }

                document.querySelector(".ma-load-cover").classList.add("hide");
                player.changeSong(0);
            },
            dataType: 'JSON'
        });

        var songTitle = document.getElementById('song-title');
        var mainContent = document.querySelector('.mdl-layout__content');
        var playlistItems = [];
        currentIndex = -1;
        player.changeSong = function (index) {
            var song = data[index];

            if (currentIndex != index && song != null) {
                if (currentIndex == -1)
                    currentIndex = 0;

                songTitle.innerText = song.songName;
                player.changeLyrics(song.songLyrics);
                audio.setAttribute('src', mp3Template.format(song.songAudioMp3));

                $(mainContent).animate({scrollTop: "0px"}, '600', 'swing');
                //reset();
                audio.play();

                var oldElement = playlistItems[currentIndex];
                oldElement.classList.remove('selected');
                var oldIcon = oldElement.querySelector(".mm-list--icon-right");
                oldIcon.innerText = "keyboard_arrow_right";
                oldIcon.classList.remove("mdl-color-text--green-700");
                oldElement.blur();

                currentIndex = index;

                var newElement = playlistItems[currentIndex];
                newElement.classList.add('selected');
                var newIcon = newElement.querySelector(".mm-list--icon-right");
                newIcon.innerText = "volume_up";
                newIcon.classList.add("mdl-color-text--green-700");
            }
        };
    }());

    var themeColor = window.top.document.querySelectorAll('.mm-theme-color');

    function changeBarColor(hex) {
        for (var i = 0; i < themeColor.length; i++) {
            themeColor[i].setAttribute('content', hex);
        }
    }

    changeBarColor('#283593');

    document.getElementById('back-button').addEventListener('click', function () {
        if (queryObject.from == "playlists")
            window.location.href = '/mobile/praise/playlists.html?filter=PCD&play=true';
        else
            window.location.href = '/mobile/praise/songs.html'
    });

    // arrow work
    var arrowContainer = document.querySelector(".ma-arrow-container");

    this.removeArrow = function () {
        var arrow = arrowContainer.querySelector(".arrow");
        if (arrow != null)
            arrowContainer.removeChild(arrow);
    };
    //end

    var lyrics = document.querySelector(".ma-lyrics");
    var lyricsTitle = lyrics.querySelector(".ma-lyrics--title");

    lyricsTitle.on("click", function () {
        if (!lyrics.classList.contains("show")) {
            lyrics.classList.remove("hide");
            lyrics.classList.add("show");
        } else {
            lyrics.classList.remove("show");
            lyrics.classList.add("hide");
        }
    });

    player.changeLyrics = function (input) {
        var lyricsText = lyrics.querySelector(".ma-lyrics--text").children[0];
        lyricsText.innerText = input;
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