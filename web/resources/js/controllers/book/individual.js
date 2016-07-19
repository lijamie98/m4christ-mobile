/**
 * Created by samuel on 7/19/16.
 */
window.addEventListener("load", function () {
    // https://css-tricks.com/snippets/jquery/get-query-params-object/
    var queryObject = (function () {
        return (document.location.search).replace(/(^\?)/, '').split('&').map(function (n) {
            return n = n.split('='), this[n[0]] = n[1], this;
        }.bind({}))[0];
    }());

    // http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
    String.prototype.format = function () {
        var formatted = this;
        for (var arg in arguments) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    document.querySelector(".mdl-layout-title").innerText = decodeURIComponent(queryObject.title);

    var bookHtmlTemplate = "http://www.m4christ.net/web/products/{0}/{1}.htm";

    var bookIFrame = document.getElementById("book-iframe");
    bookIFrame.setAttribute("src", bookHtmlTemplate.format(queryObject.label, queryObject.label));

    bookIFrame.addEventListener("load", function () {
        document.querySelector(".ma-load-cover").classList.add("hide");
    });
});