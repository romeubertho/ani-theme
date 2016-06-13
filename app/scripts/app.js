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
    'ngAnimate'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    console.log(JSON.stringify($urlRouterProvider));
    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.when('/account', '/account/overview');

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
        controller: 'LoginCtrl'
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
        templateUrl: 'views/account/overview.html',
        controller: 'AccountCtrl'
      })
      .state('account-create', {
        url: '/account/create',
        parent: 'dashboard',
        templateUrl: 'views/account/create.html',
        controller: 'AccountCtrl'
      })
      .state('account-edit', {
        url: '/account/edit',
        parent: 'dashboard',
        templateUrl: 'views/account/edit.html',
        controller: 'AccountCtrl'
      })
      .state('profile', {
        url: '/profile?username',
        parent: 'dashboard',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('groups', {
        url: '/groups',
        parent: 'dashboard',
        templateUrl: 'views/group/group.html',
        controller: 'ProfileCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('overview', {
        url: '/overview',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/overview.html'
      })
      .state('reports', {
        url: '/reports',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/reports.html'
      });

  });
