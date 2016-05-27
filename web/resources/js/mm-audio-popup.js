/**
 * Created by samuel on 2/15/16.
 */

window.addEventListener('load', function () {

        window.mmAP = new AP(); // set global AP object

        /* AP Object
         * controlles everthing javascript for mm-audio-popup. This includes
         * the FAB, audio controls, text, opening and closing, etc.*/
        function AP() {

            /*
             *    Variables
             */
            var obj = this;
            var open = false;
            var ap = document.querySelector('.mm-audio-popup-wrapper'); // get audio popup

            this.title = 'None Loaded';
            this.href = '';

            /*
             * AP Fab
             */

            var apFab = ap.querySelectorAll('.mm-ap--fab'); // get apFab

            for (var i = 0; i < apFab.length; i++) {
                apFab[i].addEventListener('click', openClose);
            }

            function openClose() {
                if (!open) {
                    obj.open();
                } else {
                    obj.close();
                }
            }

            var mainLayout = document.querySelector('.mdl-layout').querySelector('.mdl-layout__content');
            var audioWrapper = ap.querySelector('.mm-ap--audio-wrapper');
            var audioWrapperHeight = audioWrapper.offsetHeight;
            // open the player
            this.open = function (update) {
                if (open) {
                    ap.classList.add('close-open');
                    setTimeout(function () {

                        ap.classList.remove('close-open');

                        open = false;

                        obj.open(false);

                        if (update) {
                            console.log('test');
                            obj.updateInfo();
                        }
                    }, 300);
                    return null;
                }

                ap.classList.remove('close');
                ap.classList.add('open');

                var paddingBottom = audioWrapperHeight + 36;
                setTimeout(function () {
                    mainLayout.style.paddingBottom = paddingBottom + 'px';
                }, 210);

                if ((window.innerHeight + (mainLayout.scrollTop - 32)) >= mainLayout.scrollHeight) {
                    var iterations = 0;

                    var step = (paddingBottom - 72) / 15;
                    var updateScroll = setInterval(function () {
                        if (iterations < 15) {
                            mainLayout.scrollTop = mainLayout.scrollHeight + (step * iterations);
                        } else {
                            mainLayout.scrollTop = mainLayout.scrollHeight;
                            clearInterval(updateScroll);
                        }

                        iterations += 1;
                    }, 20);

                    console.log(update);

                }

                if (update) {
                    obj.updateInfo();
                }

                open = true;
            };

            this.close = function () {
                open = false;

                ap.classList.remove('open');
                ap.classList.add('close');

                mainLayout.style.paddingBottom = '72px';
            };

            this.setInfo = function (vars) {
                obj.title = vars.title;
                obj.href = vars.href;

                if (vars.open === true)
                    obj.open(vars.update);
            };

            var audioTitle = ap.querySelector('.mm-ap--audio-title');
            var audio = ap.querySelector('.mm-ap--audio');
            this.updateInfo = function () {
                audioTitle.innerText = obj.title;
                audio.src = obj.href;

                audioWrapperHeight = audioWrapper.offsetHeight;
            };
            obj.updateInfo(); // update info for initial vars

        }

    }
);