'use strict';

angular.module('quarcUiPartnerApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('applicants', {
        url: '/applicants',
        templateUrl: 'app/routes/applicants/applicants.html',
        controller: 'ApplicantsController',
        controllerAs: 'applicants'
      });
  });
