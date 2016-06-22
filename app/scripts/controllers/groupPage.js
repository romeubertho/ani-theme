'use strict';

angular.module('yapp')
    .controller('GroupPageCtrl', function ($scope, $rootScope, $state, $stateParams, GroupService, AccountService, MessageService) {
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

        GroupService.getMessages($stateParams.uid).then(function (messages, err) { // busca as mensagens do grupo
            $scope.messages = messages.data[0].messages;
            console.log(messages.data[0]);
            $scope.messages.forEach(function (m) {
                AccountService.getUserByID(m.creator).then(function (user, err) {
                    m.creator = user.data;
                    console.log(m);
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
                "message": $scope.message +" "+ $scope.groupVisited.name
            };
            MessageService.create(data).then(function (err, results) {
                $state.reload();
            }, function (err) {
                console.log(err);
            });
        }
        $scope.getProfille = function ($id) {
            AccountService.getUserByID($id).then(function (user, err) {
                //$scope.profileVisited = user.data;
            }, function (err) {
                console.log(err);
            });
        }

    });