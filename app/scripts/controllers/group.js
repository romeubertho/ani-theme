'use strict';

angular.module('yapp')
    .controller('GroupCtrl', function ($scope, $state, $location, GroupService, AccountService) {
        $scope.all = {};
        $scope.user = {};
        $scope.current_user = AccountService.getCurrentUser();
        $scope.button_new = false;
        $scope.username = {
        all: {
        }};

        GroupService.getGroups({ username: $scope.current_user }).then(function (user, err) {
            $scope.all = user.data[0].groups;
            $scope.user = user.data[0];
            console.log($scope.user);
        }, function (err) {
            console.log('err');
        });

        $scope.btFunction = function (name) {
            if ($scope.button_mode != name)
                $scope.button_mode = name;
            else
                $scope.button_mode = undefined;
            console.log($scope.button_mode);
        }
        $scope.close = function () {
            $scope.button_mode = undefined;
        }

        $scope.register = function () {
            var data =
                {
                    'name': $scope.name,
                    'creator': $scope.user.id,
                    'subscribers': $scope.user.id
                };
            GroupService.create(data).then(function (err, results) {
                $scope.button_mode = undefined;
                $state.reload();
                // $scope.$watch();
                // $scope.$apply();
            }, function (err) {
                console.log('err');
            });
        };

        $scope.edit = function () {

            debugger;
            GroupService.edit($scope.user, $scope.user.id).then(function (user, err) {
                debugger;
                $scope.user
            }, function (err) {
                console.log('err');
            });
        };
        $scope.subscribe = function ($groupID) {
            console.log($groupID);
            var username=$scope.username.all[$groupID];
            //console.log(lala[$teste]);
            AccountService.getUser(username).then(function (user, err) {
                debugger;
                var data = {
                "Subscribing": user.data.userData.id,
                "ToSubscribe": $groupID
            };
                GroupService.subscribeUser(data).then(function (err, results) {
                    $state.reload();
                }, function (err) {
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });

        }
    });