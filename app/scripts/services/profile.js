angular.module('yapp')
    .factory('ProfileService', function ($http, $window, $stateParams, AccountService) {

        var factory = {};
        // var endpoint = 'http://trab-web-c4b3l3r4.c9users.io:8080';
        var endpoint = 'http://localhost:1337';
        factory.getMessages = function ($id) {
            return $http.get(endpoint + '/message/owner/' + $id);
        }
        factory.follow = function ($data) {
            return $http.post(endpoint + '/user/' + $data.Following + '/following/' + $data.ToFollow);
        }
        factory.unfollow = function ($data) {
            return $http.delete(endpoint + '/user/' + $data.Following + '/following/' + $data.ToFollow);
        }
        factory.checkFollowing = function () { // retorna uma promisse que deve ser tratada no controller
            var currentUserID = AccountService.getCurrentUserID();           
            return $http.get(endpoint + '/user/' + currentUserID + '/following/' + $stateParams.uid);
        }
        return factory;
    });