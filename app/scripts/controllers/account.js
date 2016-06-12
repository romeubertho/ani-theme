'use strict';

angular.module('yapp')
    .controller('AccountCtrl', function ($scope, $state, AccountService) {
        $scope.$state = $state;
        $scope.data={};
        $scope.user = {};


        AccountService.getUser('maria').then(function (user, err) {
            console.log('success');
            $scope.user = user.data.userData;
            $scope.data = user.data.userData;
            console.log($scope.data);
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
            
            debugger;
            AccountService.edit($scope.user, $scope.user.id).then(function (user, err) {
                debugger;
                $scope.user
            }, function (err) {
                console.log('err');
            });
        };
    });