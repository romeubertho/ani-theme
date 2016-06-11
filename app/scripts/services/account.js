var module = angular.module('yapp', []);

module.factory('AccountService', function ($http) {

    var factory = {};

    factory.getUser = function () {
        $http.get("user/" + $scope.username).success(function (success) {
            console.log("procurando");
            console.log(success);
        });
    }

    factory.create = function () {
        $http.post("user/register/", data).success(function (success) {
            console.log(success);
        });
    }

    return factory;
});