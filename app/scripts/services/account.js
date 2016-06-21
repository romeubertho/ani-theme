angular.module('yapp')
    .factory('AccountService', function ($http,$window) {

        var factory = {};
        // var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';
        var endpoint = 'http://localhost:1337';
        factory.getUser = function ($username) {
            return $http.get(endpoint + "/user/finder/" + $username);
        }
        
        factory.getUserByID = function ($id) {
            return $http.get(endpoint + "/user/" + $id);
        }

        factory.create = function ($data) {
            return $http.post(endpoint + "/user/register/", $data);
        }

        factory.edit = function ($data, $username) {
            return $http.put(endpoint + "/user/" + $username, $data);
        }

        factory.remove = function ($data, $id) {
            return $http.delete(endpoint + "/user/" + $id);
        }

        factory.signin = function ($data) {
            return $http.post(endpoint + "/auth/", $data);
        }
        factory.getAll = function () {
            return $http.get(endpoint + "/user/");
        }
        factory.getCurrentUser = function () {
            var currentUser = $window.localStorage.user;
            var split = currentUser.split('"');
            currentUser=split[1];
            return currentUser;
        }
        factory.getCurrentUserID = function () {
            var currentUser = $window.localStorage.userID;
            return currentUser;
        }

        return factory;
    });