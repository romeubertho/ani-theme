'use strict';

angular.module('yapp')
.controller('ProfileCtrl', function ($rootScope, $scope, $stateParams, $state, AccountService) {
    debugger;
    $scope.$state = $state;
    $scope.user = {};
    $rootScope.$stateParams = $stateParams;

    AccountService.getUser($stateParams.username).then(function (user, err) {
        console.log('success');
        $scope.user = user.data;
    }, function (err) {
        console.log('err');
    });
});