'use strict';

function messageCtrl($scope) {

    $scope.filterTags = function () {
        $scope.topics = [];
        $scope.usersGroups = [];
        $scope.links = [];
        $scope.images = [];
        $scope.videos = [];
        console.log("teste");
        var messageSplit = $scope.message.split(" ");
        var searchStr = "#";
        var startIndex = 0, searchStrLen = searchStr.length;
        var index, indices = [];

        $scope.message = $scope.message.toLowerCase();
        searchStr = searchStr.toLowerCase();
        while ((index = $scope.message.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        function check(message) {
            if (message.indexOf("#") > -1) {
                $scope.topics.push(message);
                return message;
            }
            if (message.indexOf("@") > -1) {
                $scope.usersGroups.push(message);
                return message;
            }
            if (message.indexOf("$l:") > -1) {
                $scope.links.push(message);
                return message;
            }
            if (message.indexOf("$i:") > -1) {
                $scope.images.push(message);
                return message;
            }
            if (message.indexOf("$v:") > -1) {
                $scope.videos.push(message);
                return message;
            }
        }
        console.log(indices);
        console.log(messageSplit.filter(check));
    };
}