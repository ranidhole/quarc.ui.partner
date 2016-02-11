'use strict';

angular.module('quarcUiPartnerApp', [
  'quarcUiPartnerApp.auth',
  'quarcUiPartnerApp.admin',
  'quarcUiPartnerApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
