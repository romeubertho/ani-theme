angular.module('yapp')
    .factory('ProfileService', function ($http,$window) {

        var factory = {};
        // var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';
        var endpoint = 'http://localhost:1337';
        factory.getMessages = function ($id) {
            debugger;
            return $http.get(endpoint + '/message/owner/' + $id);
        }

        return factory;
    });