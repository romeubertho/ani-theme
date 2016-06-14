'use strict';

angular.module('yapp')
    .controller('GroupCtrl', function ($scope, $state, $location, GroupService, AccountService) {
        $scope.all = {};
        $scope.user = {};
        $scope.current_user = AccountService.getCurrentUser();
        $scope.button_new = false;

        GroupService.getGroups({ username: $scope.current_user }).then(function (user, err) {
            console.log(user.data[0]);
            $scope.all = user.data[0].groups;
            $scope.user = user.data[0];
            console.log($scope.user);
        }, function (err) {
            console.log('err');
        });

        $scope.new = function () {
            if ($scope.button_new == false)
                $scope.button_new = true;
            else
                $scope.button_new = false;
        }

        $scope.register = function () {
            var data =
                {
                    'name': $scope.name,
                    'creator': $scope.user.id,
                    'subscribers': $scope.user.id
                };
            GroupService.create(data).then(function (err, results) {
                    $scope.button_new = false;
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
    });