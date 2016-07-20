/**
 * Created by samuel on 7/19/16.
 */
window.addEventListener("load", function () {
    // http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    String.prototype.format = function () {
        var formatted = this;
        for (var arg in arguments) {
            //noinspection JSUnfilteredForInLoop
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    var bookHTML;
    var htmlXhttp = new XMLHttpRequest();
    htmlXhttp.onreadystatechange = function () {
        if (htmlXhttp.readyState == 4 && htmlXhttp.status == 200) {
            bookHTML = htmlXhttp.responseText;
        }
    };
    htmlXhttp.open("GET", "/resources/templates/product.html", true);
    htmlXhttp.send();

    var dataObject;

    var booksXhttp = new XMLHttpRequest();
    booksXhttp.onreadystatechange = function () {
        if (booksXhttp.readyState == 4 && booksXhttp.status == 200) {
            dataObject = JSON.parse(booksXhttp.responseText);
            useData();
        }
    };
    booksXhttp.open("GET", "http://m.m4christ.net/mobile/json/products/_filter/B", true);
    booksXhttp.send();

    var imgTemplateUrl = 'http://static.m4christ.net/products/{0}/{1}-th.jpg';
    var mainGrid = document.getElementById("main-grid");

    var individualTemplate = "/mobile/book/individual.html?label={0}&title={1}";

    function useData() {
        var dataObjectLength = dataObject.length;
        console.log("[Data Retrieved]", dataObject);
        console.log("[Example Object]", dataObject[0]);

        for (var i = 0; i < dataObjectLength; i++) {
            var data = dataObject[i];

            var container = document.createElement("div");
            container.innerHTML = bookHTML.format(individualTemplate.format(data.label, data.name),
                data.label,
                imgTemplateUrl.format(data.label, data.label), data.name);

            mainGrid.appendChild(container.children[0]);
        }

        // WOOHWEE. It's just the image of the last book.
        mainGrid.firstElementChild.firstElementChild.children[1].firstElementChild.addEventListener("load", function () {
            document.querySelector(".ma-load-cover").classList.add("hide");
            document.querySelector(".mdl-layout__content").style.overflow = "auto";
        });

        mainGrid.firstElementChild.firstElementChild.children[1].firstElementChild.addEventListener("load", function () {
            updatePosition();
        });

        setTimeout(function () {
        }, 500);
    }

    // the scroll thing

    var mobile = (function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }());

    var getPositionX;
    (function () {
        if (mobile) {
            getPositionX = function (e) {
                return e.touches[0].clientY;
            };
        }
        else
            getPositionX = function (e) {
                return e.clientY;
            };

    }());

    if (mobile) {
        var mainLayout = document.querySelector(".mdl-layout__content");
        var maScroll = document.querySelector(".ma-scroll");
        var scrollBar = maScroll.querySelector(".ma-scroll-bar");
        var maxScroll;

        maScroll.addEventListener("mousedown", scrollStart);
        maScroll.addEventListener("touchstart", scrollStart);
        document.addEventListener("mouseup", scrollStop);
        document.addEventListener("touchend", scrollStop);

        function scrollStart(e) {
            moveScroll(e)

            document.addEventListener("mousemove", moveScroll);
            document.addEventListener("touchmove", moveScroll);
        }

        function scrollStop() {
            document.removeEventListener("mousemove", moveScroll);
            document.removeEventListener("touchmove", moveScroll);
        }

        function moveScroll(e) {
            var percentage = (getPositionX(e) - maScroll.getBoundingClientRect().top) / maScroll.offsetHeight;
            if (percentage > 1) {
                percentage = 1;
            }
            mainLayout.scrollTop = maxScroll * percentage;
            console.log(maxScroll);
            e.preventDefault();
        }

        mainLayout.addEventListener("scroll", updatePosition);

        function updatePosition() {
            maxScroll = mainLayout.scrollHeight - mainLayout.offsetHeight;
            var value = ((mainLayout.scrollTop / maxScroll) * 100);

            if (value > 100) {
                value = 100;
            }

            scrollBar.style.top = "calc(" + value + "% - 24px)";
        }
    } else {
        document.querySelector(".ma-scroll").style.display = "none";
    }
});