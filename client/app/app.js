'use strict';

angular.module('qui.components', [])

angular
  .module('qui.core', [
    'qui.components',
    'http-auth-interceptor',
  ])
  .constant('MODULE_VERSION', '0.0.1')
  // this configs to initiated using provider



angular.module('uiGenApp', [
  'uiGenApp.config',
  'uiGenApp.constants',
  'qui.core',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'mwl.calendar',
  'chart.js',
  'restangular',
  'ngFileUpload',
  'angular-loading-bar'
])

  .config(function($urlRouterProvider, $locationProvider,RestangularProvider,URLS) {
    RestangularProvider.setBaseUrl(URLS.QUARC_API);
    $urlRouterProvider
      .otherwise('/applicants');

    $locationProvider.html5Mode(true);
  });


