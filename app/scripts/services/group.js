angular.module('yapp')
.factory('GroupService', function ($http) {

    var factory = {};
        // var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';
        var endpoint = 'http://localhost:1337';

    factory.getGroups = function ($data) {
        return $http.post(endpoint + "/user/findgroups", $data);
    }

    factory.create = function ($data) {
        debugger;
        return $http.post(endpoint + "/group/register", $data);
    }

    factory.edit = function ($data, $username) {
        debugger;
        return $http.put(endpoint + "/group/", $data);
    }

    return factory;
});