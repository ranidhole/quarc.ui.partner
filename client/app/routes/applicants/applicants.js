'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('applicants', {
        url: '/applicants?bucket',
        templateUrl: 'app/routes/applicants/applicants.html',
        controller: 'ApplicantsCtrl',
        controllerAs: 'Applicant'
      })
      //.state('applicants-id', {
      //  url: '/applicants/:bucket',
      //  templateUrl: 'app/routes/applicants/applicants.html',
      //  controller: 'ApplicantsCtrl',
      //  controllerAs: 'Applicant'
      //})

      .state('applicants-view', {
        url: '/applicants/:applicantId',
        templateUrl: 'app/routes/applicant/view/view.html',
        controller: 'ApplicantViewController',
        controllerAs: 'Applicant'
      });
  });
