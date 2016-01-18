/**
 * Created by Samuel on 1/12/2016.
 */

mainApp.controller("HomeController", ["$scope", function($scope) {

    $scope.imgsRoot = "/resources/imgs/"

    $scope.navLinks = [{
        "url": "/mobile/seminar.html",
        "imgSrc": "seminar-cross-th.jpg",
        "title": "講習會事奉",
        "subtitle": "風中傳愛講習會時間表"
    }, {
        "url": "/mobile/index.html",
        "imgSrc": "media-th.jpg",
        "title": "和風細語光碟事奉",
        "subtitle": "友愛的自己寫的歌"
    }, {
        "url": "/mobile/index.html",
        "imgSrc": "praise-th.jpg",
        "title": "風中傳愛歌曲",
        "subtitle": "線上播放與下載"
    }];
}]);