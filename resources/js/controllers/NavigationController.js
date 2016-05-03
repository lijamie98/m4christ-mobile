/**
 * Created by Samuel on 1/9/2016.
 */
mainApp.controller('NavigationController', ['$scope', function ($scope) {

    $scope.links = [
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
        }
    ];
}]);