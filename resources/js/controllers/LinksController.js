/**
 * Created by Samuel on 1/9/2016.
 */
mainApp.controller('LinksController', ['$scope', '$http', function ($scope, $http) {

    var trys = 4;

    function getLinks() {
        $http.get('/resources/json/links.json').then(function (response) {

            $scope.links = response.data;

        }, function (response) {

            if (trys != 0) {
                getLinks();

                msg('Try ' + (5 - trys) + ' to get data failed... attempting ' + trys + ' more times', 1500);

                trys--;
            } else {
                msg('All tries failed... either your connection is unstable or it\'s our fault <br/>If so, please contact us', 10000);
            }
        });
    }

    getLinks();

}]);