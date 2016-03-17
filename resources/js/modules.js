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
});