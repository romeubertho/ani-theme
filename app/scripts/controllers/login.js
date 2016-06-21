'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($rootScope, $scope, $location, $window, AccountService, Authorization) {
    $scope.fail = false;
    $scope.signin = function() {
        var formData = {
            username: $scope.username,
            password: $scope.password
        }

        AccountService.signin(formData).then(function(res) {
            if (res.type == false) {
              $scope.fail = true;
            } else {
              $scope.fail = false;
                $window.localStorage.token = res.data.token;
                $window.localStorage['user'] = angular.toJson(res.data.user.username); //passa somente o usuário
                $window.localStorage['userID'] = angular.toJson(res.data.user.id); //passa somente o id
                $window.localStorage.authorized = true;
                Authorization.authorized = true;
                Authorization.token = $window.localStorage.token;
                $location.path('/dashboard');
            }
        }, function() {
          $scope.fail = true;
            $rootScope.error = 'Falha ao tentar acessar';
        })
    };

    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
    }
    $scope.register = function() {

      $location.path('/register');

      return false;
    }

  });
