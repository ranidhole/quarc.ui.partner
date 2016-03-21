/**
 * LIST    /applicants             ->  ApplicantsCtrl
 * NEW     /applicants/new         ->  ApplicantNewController
 * VIEW    /applicants/:id         ->  ApplicantViewController
 */

'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('applicants', {
        url: '/applicants?status',
        templateUrl: 'app/routes/applicants/applicants.html',
        controller: 'ApplicantsCtrl',
        controllerAs: 'Applicant'
      })
      .state('applicants-view', {
        url: '/applicants/:applicantId',
        templateUrl: 'app/routes/applicants/view/view.html',
        controller: 'ApplicantViewController',
        controllerAs: 'Applicant'
      });
  });
