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

  });
