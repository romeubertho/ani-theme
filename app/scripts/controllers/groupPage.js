'use strict';

angular.module('yapp')
    .controller('GroupPageCtrl', function ($scope, $rootScope, $state, $stateParams, GroupService, AccountService,MessageService) {
       $scope.currentUser = AccountService.getCurrentUser();
        $scope.currentUserID = AccountService.getCurrentUserID();
        $scope.groupFollowing; 
        $scope.groupVisited = "";
        $scope.messages = [];
        $scope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        GroupService.getGroupByID($stateParams.uid).then(function (group, err) { // pega as info do grupo
            $scope.groupVisited = group.data;
            //console.log($scope.groupVisited);
        }, function (err) {
            console.log(err);
        });

        GroupService.getMessages2($stateParams.uid).then(function (group, err) { // pega as info do grupo
            //console.log(group);
        }, function (err) {
            console.log(err);
        });

        MessageService.timeline().then(function (results, err) {
            debugger;
                console.log(results);
            }, function (err) {
                console.log(err);
            });

        GroupService.getMessages($stateParams.uid).then(function (messages, err) { // busca as mensagens do grupo
            debugger;
            $scope.messages = messages.data.messages;
            //console.log($scope.messages);
            $scope.messages.forEach(function(m) {
                AccountService.getUserByID(m.creator).then(function (user, err) {
                    m.creator=user.data;
            //console.log(m);
        }, function (err) {
            console.log(err);
        });
            }, this);
        }, function (err) {
            console.log('err');
        });

        $scope.createMessage = function () { // vai criar uma mensagem para postar no grupo
            var data = {
                "owner": $scope.currentUserID,
                "message": $scope.message
            };
            MessageService.create(data).then(function (err, results) {
                $state.reload();
            }, function (err) {
                console.log(err);
            });
        }

        $scope.getProfille=function ($id) {
            AccountService.getUserByID($id).then(function (user, err) {
            //$scope.profileVisited = user.data;
        }, function (err) {
            console.log(err);
        });
        }
        
    });