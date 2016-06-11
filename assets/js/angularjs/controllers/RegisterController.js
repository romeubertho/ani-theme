'use strict';

function registerCtrl($scope, $http) {

    $scope.register = function () {
        var data =
                {
                    'username': $scope.username,
                    'password': $scope.password,
                    'name': $scope.name,
                    'birthday': $scope.birthday,
                    'description': $scope.description
                };
                $http.get("user/"+$scope.username).success(function(success){
                    console.log("procurando");
                    console.log(success);
                });
        $http.post("user/register/", data).success(function (success) {
            console.log(success);
        });
    };
}