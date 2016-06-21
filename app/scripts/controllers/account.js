'use strict';

angular.module('yapp')
    .controller('AccountCtrl', function ($scope, $window, $state, AccountService) {
        $scope.$state = $state;
        $scope.data = {};
        $scope.user = {};
        $scope.all = {};
        $scope.current_user = AccountService.getCurrentUser();

        AccountService.getUser($scope.current_user).then(function (user, err) {
            $scope.user = user.data.userData;
            $scope.data = user.data.userData;
        }, function (err) {
            console.log('err');
        });
        AccountService.getAll().then(function (user, err) {
            console.log(user.data);
            $scope.all = user.data;
        }, function (err) {
            console.log('err');
        });

        $scope.register = function () {
            var data =
                {
                    'username': $scope.username,
                    'password': $scope.password,
                    'name': $scope.name,
                    'birthday': $scope.birthday,
                    'description': $scope.description
                };
            AccountService.create(data).then(function (err, results) {
                console.log('success');
            }, function (err) {
                console.log('err');
            });
        };

        $scope.edit = function () {
            AccountService.edit($scope.user, $scope.user.id).then(function (user, err) {
                $scope.user
                alert("Edit succesfully!")
                $state.reload();
            }, function (err) {
                console.log('err');
            });
        };
        $scope.removeAccount = function () {
            AccountService.remove($scope.user, $scope.user.id).then(function (user, err) {
                $scope.user
                alert("Edit succesfully!")
                $state.reload();
            }, function (err) {
                console.log('err');
            });
        };
    });