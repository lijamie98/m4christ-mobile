/**
 * Created by samuel on 7/19/16.
 */
window.addEventListener("load", function() {
    var links = [
        {
            "name": "首頁",
            "src": "/mobile/index.html"
        },
        {
            "name": "講習會事奉",
            "src": "/mobile/seminar.html"
        },
        {
            "name": "和風細語光碟事奉",
            "src": "/mobile/media.html"
        },
        {
            "name": "風中傳愛歌曲",
            "src": "/mobile/praise.html"
        },{
            "name": "BOOK",
            "src": "/mobile/book.html"
        }
    ];

    //<a href="/mobile" class="mdl-navigation__link mdl-js-ripple-effect mdl-color-text--white">
    //    PLZ WORK ON ME. I DONT WANT DA ANGULAR.
    //<span class="mdl-ripple"></span></a>

    var drawerContainer = document.querySelector(".mdl-navigation");

    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        var navLink = document.createElement("a");
        navLink.href = link.src;
        navLink.className = "mdl-navigation__link mdl-js-ripple-effect mdl-color-text--white";
        navLink.innerText = link.name;

        var ripple = document.createElement("span");
        ripple.className = "mdl-ripple";

        navLink.appendChild(ripple);
        drawerContainer.appendChild(navLink);
    }
});