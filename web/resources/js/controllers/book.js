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

    var bookHTML = document.getElementById("skeleton").innerHTML;

    var dataObject;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            dataObject = JSON.parse(xhttp.responseText);
            useData();
        }
    };
    xhttp.open("GET", "http://m.m4christ.net/mobile/json/products/_filter/B", true);
    xhttp.send();

    var imgTemplateUrl = 'http://static.m4christ.net/products/{0}/{1}-ths.jpg';
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

        setTimeout(function () {
        }, 500);
    }
});