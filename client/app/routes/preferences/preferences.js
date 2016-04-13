'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('preferences', {
        url: '/preferences',
        templateUrl: 'app/routes/preferences/preferences.html',
        controller: 'PreferencesCtrl',
        controllerAs: 'Preferences'
      });
  });
