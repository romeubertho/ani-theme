'use strict';

angular.module('yapp')
    .controller('GroupCtrl', function ($scope, $state, $location, GroupService, AccountService) {
        $scope.all = {};
        $scope.user = {};
        $scope.current_user = AccountService.getCurrentUser();
        $scope.button_new = false;
        $scope.username = {
        all: {
        }};
        $scope.usernamer = {
        all: {
        }};
        $scope.groupName = {
        all: {
        }};

        GroupService.getGroups({ username: $scope.current_user }).then(function (user, err) {
            $scope.all = user.data[0].groups;
            $scope.user = user.data[0];
            console.log($scope.user);
        }, function (err) {
            console.log('err');
        });

        $scope.btFunction = function (name) {
            if ($scope.button_mode != name)
                $scope.button_mode = name;
            else
                $scope.button_mode = undefined;
            console.log($scope.button_mode);
        }
        $scope.close = function () {
            $scope.button_mode = undefined;
        }

        $scope.register = function () {
            var data =
                {
                    'name': $scope.name,
                    'creator': $scope.user.id,
                    'subscribers': $scope.user.id
                };
            GroupService.create(data).then(function (err, results) {
                $scope.button_mode = undefined;
                $state.reload();
                // $scope.$watch();
                // $scope.$apply();
            }, function (err) {
                console.log('err');
            });
        };

        $scope.edit = function ($groupID) {
             var data = "@"+$scope.groupName.all[$groupID]; 
            GroupService.find(data).then(function (user, err) {
                debugger;
                if(user.data.length==0)
                {
                    var dataToEdit = {
                        "name":"@"+$scope.groupName.all[$groupID]
                    };
                    GroupService.edit(dataToEdit,$groupID).then(function (err, results) {
                    $state.reload();
                }, function (err) {
                    alert("Edit done!");
                    console.log(err);
                });
                }
                
            }, function (err) {
                alert("User Not found!");
                console.log(err);
            });
        };

        $scope.remove = function ($groupID) {
           GroupService.removeGroup($groupID).then(function (err, results) {
                    alert("Group removed successfully!");
                    $state.reload();
                }, function (err) {
                    alert("ERROR!");
                    console.log(err);
                });
        };

        $scope.subscribe = function ($groupID) {
            console.log($groupID);
            var username=$scope.username.all[$groupID];
            //console.log(lala[$teste]);
            AccountService.getUser(username).then(function (user, err) {
                debugger;
                var data = {
                "Subscribing": user.data.userData.id,
                "ToSubscribe": $groupID
            };
                GroupService.subscribeUser(data).then(function (err, results) {
                    $state.reload();
                }, function (err) {
                    alert("User already subscribed!");
                    console.log(err);
                });
            }, function (err) {
                alert("User Not found!");
                console.log(err);
            });

        }
        $scope.unsubscribeUser = function ($groupID) {
            console.log($groupID);
            var username=$scope.usernamer.all[$groupID];
            //console.log(lala[$teste]);
            AccountService.getUser(username).then(function (user, err) {
                debugger;
                var data = {
                "Subscribing": user.data.userData.id,
                "ToSubscribe": $groupID
            };
                GroupService.unsubscribeUser(data).then(function (err, results) {
                    $state.reload();
                }, function (err) {
                    alert("User already unsubscribed!");
                    console.log(err);
                });
            }, function (err) {
                alert("User Not found!");
                console.log(err);
            });

        }
    });