/**
 * Created by Samuel on 1/12/2016.
 */

mainApp.controller("SeminarController", ["$scope", "$http", function ($scope, $http) {

    $scope.imgsRoot = "/resources/imgs/"

    $scope.infoTitle = "主僕疏效平簡介";

    $scope.infoText = "一九五四年出生於台灣，一九九一年六月二十九日在聖神內領洗，感主厚恩，為愛祂獻上一生，單單為祂而活。" +
        "一九九七年蒙主召叫，" +
        "跟隨祂奔走於美國、加拿大、臺灣、馬來西亞、新加坡、汶萊、羅馬、德國、澳洲、香港、中國…等地，為主見證、傳主福音。" +
        "如果您要邀請主僕疏效平為您的團體服務，請按這裡。";

    function getData(name, url, scope) {
        var trys = 3 + 1;

        function actualMethod() {
            $http({
                method: 'GET',
                url: url
            }).then(function (response) {

                $scope[scope] = response.data;

                console.info('[ ' + name + ' ]', response.data);

                msg('[ ' + name + ' ] Retrieved ' + name + ' Succesfully');

            }, function (response) {

                console.log(response);

                if (trys != 0) {
                    getPastSeminars();

                    console.warn('[ ' + name + ' ] Try ' + (5 - trys) + ' to get data failed... attempting ' + trys + ' more times');

                    trys--;
                } else {
                    console.warn('[ ' + name + ' ] All tries failed... either your connection is unstable or it\'s our fault <br/>If so, please contact us');
                }
            });
        }

        actualMethod();
    }

    getData('Past Seminars', 'http://m.m4christ.net/mobile/json/seminars/past', 'pastSeminars');

    getData('Future Seminars', 'http://m.m4christ.net/mobile/json/seminars/coming', 'comingSeminars');

}]).directive('seminarInfoText', function () {
    return {
        restrict: 'E',
        templateUrl: '/resources/templates/seminar-info-text.html'
    };
}).directive('seminarComingSeminars', function () {
    return {
        restrict: 'E',
        templateUrl: '/resources/templates/coming-seminars.html'
    };
}).directive('seminarPastSeminars', function () {
    return {
        restrict: 'E',
        templateUrl: '/resources/templates/past-seminars.html'
    };
});