'use strict';

angular.module('yapp')
.controller('ProfileCtrl', function ($scope, $rootScope, $state, $stateParams, AccountService, ProfileService) {
    debugger;
    $scope.currentUser = AccountService.getCurrentUser();
    $scope.messages = [];
    $scope.$state = $state;
    $scope.user = {};
    $rootScope.$stateParams = $stateParams;

    var message = {owner: "", message: ""}

    ProfileService.getMessages($stateParams.uid).then(function (messages, err) {
        debugger;
        $scope.messages = messages.data;
    }, function (err) {
        console.log('err');
    });
});