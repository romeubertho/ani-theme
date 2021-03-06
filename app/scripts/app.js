'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'flow',
    'ngFileUpload'
  ])
  .constant('_', window._)
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push(['$q', '$location', '$window', function($q, $location, $window) {
      return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($window.localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);

    $urlRouterProvider.when('/dashboard', '/dashboard/overview'); 
    //$urlRouterProvider.when('/account', '/account/overview');

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
      .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        data: {
          authorization: false,
          redirectTo: 'login'
        }
      })
      .state('register', {
        url: '/register',
        parent: 'base',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .state('account', {
        url: '/account',
        parent: 'dashboard',
        templateUrl: 'views/account/users.html',
        controller: 'AccountCtrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('account-edit', {
        url: '/account/edit',
        parent: 'dashboard',
        templateUrl: 'views/account/edit.html',
        controller: 'AccountCtrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('profile', {
        url: '/profile?uid',
        parent: 'dashboard',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve:{
          checkFollowing: function(ProfileService){
            return ProfileService.checkFollowing();
          }
        },
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('groups', {
        url: '/groups',
        parent: 'dashboard',
        templateUrl: 'views/group/group.html',
        controller: 'GroupCtrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('group-page', {
        url: '/groups/group?uid',
        parent: 'dashboard',
        templateUrl: 'views/group/grouppage.html',
        controller: 'GroupPageCtrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('overview', {
        url: '/overview',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/overview.html',
        controller: 'MessageCtrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      });

  })
  .run(function(_, $rootScope, $state, $window, Authorization) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (!$window.localStorage.token && toState.data.authorization && toState.data.redirectTo) {
        $state.go(toState.data.redirectTo);
      }
    });
});
