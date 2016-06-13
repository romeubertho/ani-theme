angular.module('yapp')
    .factory('AccountService', function ($http) {

        var factory = {};
        // var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';
        var endpoint = 'http://localhost:1337';
        factory.getUser = function ($username) {
            return $http.get(endpoint + "/user/finder/" + $username);
        }

        factory.create = function ($data) {
            return $http.post(endpoint + "/user/register/", $data);
        }

        factory.edit = function ($data, $username) {
            return $http.put(endpoint + "/user/" + $username, $data);
        }

        factory.signin = function ($data) {
            return $http.post(endpoint + "/auth/", $data);
        }

        return factory;
    });