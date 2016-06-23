'use strict';

angular.module('yapp')
    .controller('MessageCtrl', function ($scope, $rootScope, $state, AccountService, ProfileService, MessageService) {
        $scope.currentUser = AccountService.getCurrentUser();
        $scope.currentUserID = AccountService.getCurrentUserID();
        $scope.messages = {};
        $scope.$state = $state;
        $scope.user = {};

        var message = { owner: "", message: "" }

        MessageService.timeline($scope.currentUserID).then(function (messages, err) {
            $scope.messages = messages.data;
            console.log($scope.messages);
        }, function (err) {
            console.log('err');
        });

        $scope.createMessage = function () {
            if ($scope.currentUserID != $scope.profileVisited.id)
                $scope.message = $scope.message + "  @" + $scope.profileVisited.username;
            var data = {
                "owner": $scope.currentUserID,
                "message": $scope.message
            };
            MessageService.create(data).then(function (err, results) {
                $state.reload();
            }, function (err) {
                console.log(err);
            });
        }
        $scope.followUser = function () {
            var data = {
                "Following": $scope.currentUserID,
                "ToFollow": $stateParams.uid
            };
            ProfileService.follow(data).then(function (err, results) {
                $state.reload();
            }, function (err) {
                console.log(err);
            });
        }
        $scope.unfollowUser = function () {
            var data = {
                "Following": $scope.currentUserID,
                "ToFollow": $stateParams.uid
            };
            ProfileService.unfollow(data).then(function (err, results) {
                $state.reload();
            }, function (err) {
                console.log(err);
            });
        }
        $scope.removeMessage = function ($messageID) {
            MessageService.remove($messageID).then(function (user, err) {
                alert("Message removed succesfully!")
                $state.reload();
            }, function (err) {
                console.log('err');
            });
        };
    });