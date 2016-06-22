'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($scope, $state, AccountService) {

    $scope.$state = $state;
    $scope.CurrentUser = AccountService.getCurrentUser();
    $scope.CurrentUserID = AccountService.getCurrentUserID();
    $scope.user = {};

    AccountService.getUserByID($scope.CurrentUserID).then(function (user, err) {
        $scope.user = user.data;
    }, function (err) {
        console.log(err);
    });

  });
