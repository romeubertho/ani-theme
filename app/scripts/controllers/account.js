'use strict';

angular.module('yapp')
    .controller('AccountCtrl', function ($scope, $window, $state, AccountService, Upload) {
        $scope.$state = $state;
        $scope.data = {};
        $scope.user = {};
        $scope.all = {};
        $scope.files = [];
        $scope.progressPercentage = 0;
        $scope.progressPercentageClass = 'progress-bar-danger';
        $scope.uploadLabel = "Click to upload a Photo";
        $scope.current_user = AccountService.getCurrentUser();

        // upload on file select or drop 
        $scope.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:1337/user/upload',
                data: { image: file }
            }).then(function (resp) {
                if (resp.data.localFileName) $scope.user.profilePhoto = resp.data.localFileName;
                return;
            }, function (resp) {
                console.log(resp);
                return;
            }, function (evt) {
                $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                if ($scope.progressPercentage > 99) {
                    $scope.progressPercentageClass = 'progress-bar-success';
                    $scope.uploadLabel = "Photo uploaded"
                }
            });
        };

        AccountService.getUser($scope.current_user).then(function (user, err) {
            $scope.user = user.data.userData;
            $scope.data = user.data.userData;
        }, function (err) {
            console.log('err');
        });
        AccountService.getAll().then(function (user, err) {
            $scope.all = user.data;
            $scope.all.sort(function (a, b) {
                var keyA = new String(a.username);
                var keyB = new String(b.username);
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
        }, function (err) {
            console.log('err');
        });

        $scope.register = function () {
            var data =
                {
                    'username': $scope.username,
                    'password': $scope.password,
                    'name': $scope.name,
                    'birthday': $scope.birthday,
                    'description': $scope.description,
                    'photo': $scope.user.profilePhoto
                };
            AccountService.create(data).then(function (err, results) {
                console.log('success');
            }, function (err) {
                console.log('err');
            });
        };

        $scope.edit = function () {
            AccountService.edit($scope.user, $scope.user.id).then(function (user, err) {
                $scope.user
                alert("Edit succesfully!")
                $state.reload();
            }, function (err) {
                console.log('err');
            });
        };
        $scope.removeAccount = function () {
            AccountService.remove($scope.user, $scope.user.id).then(function (user, err) {
                $scope.user
                alert("Edit succesfully!")
                $state.reload();
            }, function (err) {
                console.log('err');
            });
        };
    });