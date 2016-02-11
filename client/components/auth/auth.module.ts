'use strict';

angular.module('quarcUiPartnerApp.auth', [
  'quarcUiPartnerApp.constants',
  'quarcUiPartnerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
