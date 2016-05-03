/**
 * Created by Samuel on 1/9/2016.
 */

var mainApp = angular.module("mainApp", []).directive('css', function () {
    return {
        restrict: 'E',
        templateUrl: '/resources/templates/past-seminars.html'
    }
}).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}]).filter('date', function ($filter) {

    return function (input) {
        if (input == null) {
            return "";
        }

        var date = new Date(input);

        var year = date.getFullYear();

        var month = date.getMonth() + 1;

        if (month < 10) {
            month = "0" + month;
        }

        var day = date.getDate();

        if (day < 10) {
            day = "0" + day;
        }

        var dateString = year + " 年 " + month + " 月 " + day + " 日";

        return dateString;
    };
}).directive('mobileFooter', function () {
    function controller($scope, $element) {
        $element.attr("class", "mm-footer");
        var footer = $element[0];

        var scrollElement = document.querySelector(".mdl-layout__content");
        var defaultBottom = -107;

        setFooterBottom(scrollElement);
        scrollElement.addEventListener("scroll", function () {
            setFooterBottom(this);
        });

        function setFooterBottom(element) {
            var threshold = element.scrollTop - ((element.scrollHeight - element.offsetHeight) - Math.abs(defaultBottom));

            if (threshold >= 0) {
                footer.style.bottom = defaultBottom + threshold + "px";
                console.log("STARTOOOOO");
            }
            else {
                footer.style.bottom = defaultBottom + "px";
            }
        }

    }

    return {
        restrict: 'A',
        controller: controller,
        templateUrl: "/resources/templates/mobile-footer.html"
    }
});