'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
var app = angular.module('yapp');
app.controller('RegisterCtrl', function ($scope, $location, AccountService) {
    $scope.submit = function () {

        $location.path('/dashboard');

        return false;
    }
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
});
app.directive('usernameValidator', function (AccountService, $q) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.username = function (modelValue, viewValue) {
                return AccountService.getUser(viewValue).then(
                    function (user,err) {
                        console.log(user);
                        var deferred = $q.defer();
                        if (err) {
                            deferred.resolve();
                            return deferred.promise;
                        }
                        else {
                            deferred.reject();
                            deferred.resolve();
                            return deferred.promise;
                        }
                    }
                );
            };
        }
    };
});
