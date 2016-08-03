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
    var titleTemplate = "{0} ({1})";

    var bookRequest = new XMLHttpRequest();
    bookRequest.responseType = "json";

    bookRequest.onreadystatechange = function() {
        if (bookRequest.readyState == 4 && bookRequest.status == 200) {
            var response = bookRequest.response;
            console.log("[Response]", response);

            document.querySelector(".mdl-layout-title").innerText = titleTemplate.format(response.name, response.labelWeb);
            document.querySelector("title").innerText = titleTemplate.format(response.name, response.labelWeb);

            var img = document.querySelector("#img");
            img.src = response.imageURL;

            addText(document.querySelector("#introduction"), response.introduction, true);

            img.addEventListener("load", function() {
                document.querySelector(".ma-load-cover").classList.add("hide");
            });

            var epub = document.querySelector("#epub");
            var pdf = document.querySelector("#pdf");
            var html = document.querySelector("#html");
            if (response.bookEpubURL.length == 0) {
                epub.style.display = "none";
            }

            epub.setAttribute("href", response.bookEpubURL);
            pdf.setAttribute("href", response.bookPDFURL);
            html.setAttribute("href", response.bookHtmlURL);
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