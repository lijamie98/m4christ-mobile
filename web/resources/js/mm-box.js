/**
 * Created by samuel on 2/13/16.
 */

(function () {
    window.mmBox = {
        "intercept": function (href) {
            return href;
        },
        "recapture": function () {
            var links = document.querySelectorAll(".iframe-link");

            var linksLength = links.length;

            for (var i = 0; i < linksLength; i++) {
                links[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    open(this.href);
                });
            }
        }
    }

    window.addEventListener('load', function () {

        (function () {
            var frameContainer = document.createElement('div');

            frameContainer.innerHTML = '<div class="embed-container">' +
                '<div class="iframe-close">' +
                '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">' +
                '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>' +
                '<path d="M0 0h24v24H0z" fill="none"/></svg>' +
                '</div>' +
                '<iframe class="embed-iframe" allowfullscreen allowtransparency="">' +
                '</iframe>' +
                '<div class="iframe-loading">Loading...</div>' +
                '</div>';
            frameContainer.className = 'iframe-container';
            document.body.appendChild(frameContainer);
        }());

        document.querySelector(".iframe-close").addEventListener("click", function () {
            close();
        });
    });

    function open(href) {

        href = window.mmBox.intercept(href);

        var iframe = document.querySelector(".embed-iframe");
        iframe.src = href;

        document.querySelector(".iframe-container").style.display = "block";

        iframe.addEventListener("load", showIframe);

        function showIframe() {

            iframe.style.display = "block";

            iframe.removeEventListener("load", showIframe);
        }
    }

    function close() {
        document.querySelector(".iframe-container").style.display = "none";

        var iframe = document.querySelector(".embed-iframe");
        iframe.src = "about:blank";

        iframe.style.display = "none";
    }
}());