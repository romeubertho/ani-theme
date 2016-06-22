angular.module('yapp')
.factory('GroupService', function ($http) {

    var factory = {};
        // var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';
        var endpoint = 'http://localhost:1337';

    factory.getGroups = function ($data) {
        return $http.post(endpoint + "/user/findgroups", $data);
    }

    factory.getGroupByID = function ($data) {
        return $http.post(endpoint + "/group/"+$data);
    }

    factory.getMessages = function ($data) {
        var json={
            "id":$data 
        }
        return $http.post(endpoint + "/group/getmessages",json);
    }

    factory.create = function ($data) {
        return $http.post(endpoint + "/group/register", $data);
    }

    factory.edit = function ($data,$id) {
        return $http.put(endpoint + "/group/"+$id, $data);
    }

    factory.removeGroup = function ($id) {
        return $http.delete(endpoint + "/group/"+$id);
    }
    
    factory.find = function ($data) {
        return $http.get(endpoint + "/group?name="+ $data);
    }

    factory.subscribeUser = function ($data) {
            return $http.post(endpoint + '/user/' + $data.Subscribing + '/subscriptions/' + $data.ToSubscribe);
        }

        factory.unsubscribeUser = function ($data) {
            return $http.delete(endpoint + '/user/' + $data.Subscribing + '/subscriptions/' + $data.ToSubscribe);
        }

    return factory;
});