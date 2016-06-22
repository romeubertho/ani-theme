'use strict';

angular.module('yapp')
    .controller('ProfileCtrl', function ($scope, $rootScope, $state, $stateParams, AccountService, ProfileService, MessageService) {
        $scope.currentUser = AccountService.getCurrentUser();
        $scope.currentUserID = AccountService.getCurrentUserID();
        $scope.profileFollowing;
        $scope.profileVisited = "";
        $scope.messages = [];
        $scope.$state = $state;
        $scope.user = {};
        $rootScope.$stateParams = $stateParams;

        var message = { owner: "", message: "" }

        ProfileService.getMessages($stateParams.uid).then(function (messages, err) {
            $scope.messages = messages.data;
        }, function (err) {
            console.log('err');
        });

        AccountService.getUserByID($stateParams.uid).then(function (user, err) {
            $scope.profileVisited = user.data;
        }, function (err) {
            console.log(err);
        });

        ProfileService.checkFollowing().then(function (result, err) {
            if (result.data.length > 0 && AccountService.getCurrentUserID() != $stateParams.uid) {
                $scope.profileFollowing = true;
                $scope.button_mode = "Unfollow";
            }
            else if (result.data.length == 0 && AccountService.getCurrentUserID() != $stateParams.uid) {
                $scope.profileFollowing = false;
                $scope.button_mode = "Follow";
            }
            else {
                $scope.button_mode = undefined;
                if (AccountService.getCurrentUserID() == $stateParams.uid)
                    $scope.button_mode = "Edit";
            }
            //console.log($scope.button_mode);
        }, function (err) {
            console.log(err);
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