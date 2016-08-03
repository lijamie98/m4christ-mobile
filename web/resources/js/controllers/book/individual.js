/**
 * Created by samuel on 7/19/16.
 */
window.addEventListener("load", function () {
    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            //noinspection CommaExpressionJS
            return n = n.split('='), this[n[0]] = n[1], this;
        }.bind({}))[0];
    }());

    // http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    String.prototype.format = function () {
        var formatted = this;
        for (var arg in arguments) {
            //noinspection JSUnfilteredForInLoop
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    var rootUrl = '/mobile/json/products/';

    document.querySelector(".mdl-layout-title").innerText = queryObject.label;
    document.querySelector("title").innerText = queryObject.label;

    var bookRequest = new XMLHttpRequest();
    bookRequest.responseType = "json";

    bookRequest.onreadystatechange = function() {
        if (bookRequest.readyState == 4 && bookRequest.status == 200) {
            var response = bookRequest.response;
            console.log("[Response]", response);

            document.querySelector(".mdl-layout-title").innerText = response.name;
            document.querySelector("title").innerText = response.name;

            var img = document.querySelector("#img");
            img.src = response.imageURL;

            addText(document.querySelector("#name"), response.name);
            addText(document.querySelector("#introduction"), response.introduction, true);

            img.addEventListener("load", function() {
                document.querySelector(".ma-load-cover").classList.add("hide");
            });
        }
    };

    bookRequest.open("GET", rootUrl + queryObject.label, true);
    bookRequest.setRequestHeader("Accept", "application/json");
    bookRequest.send();

    function addText(element, text, unsafe) {
        if (unsafe) {
            element.innerHTML += text;
        } else {
            element.appendChild(document.createTextNode(text));
        }
    }
});