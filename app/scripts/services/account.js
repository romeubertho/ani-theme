angular.module('yapp')
.factory('AccountService', function ($http) {

    var factory = {};
    var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';

    factory.getUser = function ($username) {
        return $http.get(endpoint + "/user/" + $username);
    }

    factory.create = function ($data) {
        debugger;
        return $http.post(endpoint + "/user/register/", $data);
    }

    factory.edit = function ($data, $username) {
        debugger;
        return $http.put(endpoint + "/user/", $data);
    }

    return factory;
});