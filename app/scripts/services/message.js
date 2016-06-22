angular.module('yapp')
.factory('MessageService', function ($http) {

    var factory = {};
    //var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';
    var endpoint = 'http://localhost:1337';

    factory.getUser = function ($username) {
        return $http.get(endpoint + "/message/" + $username);
    }

    factory.create = function ($data) {
        return $http.post(endpoint + "/message/", $data);
    }

    factory.edit = function ($data, $username) {
        return $http.put(endpoint + "/message/", $data);
    }
    factory.timeline=function($uid){
        var data={
            "id":$uid
        }
        return $http.post(endpoint + "/user/timeline/", data);
    }
    factory.remove = function ($data) {
        return $http.delete(endpoint + "/message/"+ $data);
    }

    return factory;
});