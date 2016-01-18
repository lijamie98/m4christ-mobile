(function () {
    var toast = document.createElement("div");
    toast.className = "msg-toast";

    var toastCSS = document.createElement("style");

    toastCSS.innerHTML = ".msg-toast {\n" +
        "   position: fixed;\n" +
        "   bottom: 16px;\n" +
        "   right: -300px;\n" +
        "   max-height: 186px;\n" +
        "   width: 35%;\n" +
        "   min-width: 145px;\n" +
        "   max-width: 300px;\n" +
        "   padding: 10px 24px;\n" +
        "   background-color: rgba(0, 0, 0, 0.34);\n" +
        "   color: #fff;\n" +
        "\n" +
        "   overflow: hidden;\n" +
        "   transition: all 685ms cubic-bezier(0.250, 0.460, 0.480, 1.015);" +
        "   z-index: 16000;\n" +
        "   border-radius: 12px;\n" +
        "   box-sizing: border-box;\n" +
        "   font-family: 'Roboto', 'Segoe UI', sans-serif;\n" +
        "}";

    toastCSS.innerHTML = toastCSS.innerHTML + "\n\n" +
        ".msg-toast.open {\n" +
        "   bottom: 16px;\n" +
        "   right: 16px;\n" +
        "}";

    window.onload = function () {
        document.head.appendChild(toastCSS);
    };

    var text = "";

    var timeout;

    var appended = false;

    window.msg = function (msg, time) {

        if (!appended)
            document.body.appendChild(toast);

        appended = true;

        clearTimeout(timeout);

        toast.className = "msg-toast open";

        if (text != "")
            text += "</br>" + msg;
        else
            text += msg;

        toast.innerHTML = text;

        toast.scrollTop = Number.MAX_SAFE_INTEGER;

        timeout = setTimeout(function () {
            text = "";
            toast.className = "msg-toast";
        }, (time || 6138) + 685);
        return text;
    };
}());