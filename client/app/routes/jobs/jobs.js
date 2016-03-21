'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      //.state('jobs', {
      //  url: '/jobs',
      //  templateUrl: 'app/routes/jobs/applicants/list/list.html',
      //  controller: 'JobsApplicantsListCtrl',
      //  controllerAs: 'JobsApplicantsList',
      //})
      .state('jobs-applicants', {
        url: '/jobs/:jobId/applicants?status',
        templateUrl: 'app/routes/jobs/applicants/list/list.html',
        controller: 'JobsApplicantsListController',
        controllerAs: 'JobsApplicantsList',
        resolve:{
          currentJob: function(Restangular,$stateParams){
            return Restangular
              .one('jobs',$stateParams.jobId)
              .get()
              .then(function(job){
                return job;
              })
              .catch(function(){
                return console.log("Error while get job details")
              })
          }
        },
        authenticate: true
      })
      .state('jobs-interviews', {
        url: '/jobs/:jobId/interviews?status',
        templateUrl: 'app/routes/jobs/interviews/interviews.html',
        controller: 'InterviewsController',
        controllerAs: 'Interviews',
        resolve:{
          currentJob: function(Restangular,$stateParams){
            return Restangular
              .one('jobs',$stateParams.jobId)
              .get()
              .then(function(job){
                return job;
              })
              .catch(function(){
                return console.log("Error while get job details")
              })
          }
        },
        authenticate: true
      })
      // Todo: rename cv-received to references
      .state('jobs-references', {
        url: '/jobs/:jobId/references?status',
        templateUrl: 'app/routes/jobs/references/list/list.html',
        controller: 'ReferencesListController',
        controllerAs: 'ReferencesList',
        resolve:{
          currentJob: function(Restangular,$stateParams){
            return Restangular
              .one('jobs',$stateParams.jobId)
              .get()
              .then(function(job){
                return job;
              })
              .catch(function(){
                return console.log("Error while get job details")
              })
          }
        },
        authenticate: true
      })
      .state('jobs-manage-jd', {
        url: '/jobs/manage-jd?status',
        templateUrl: 'app/routes/jobs/manage-jd/manage-jd.html',
        controller:'ManageJdController',
        controllerAs: 'ManageJd',
        authenticate: true
      })
      .state('jobs-view', {
        url: '/jobs/:jobId',
        templateUrl: 'app/routes/jobs/view/view.html',
        controller: 'JobViewController',
        controllerAs: 'JobView',
        resolve:{
          currentJob: function(Restangular,$stateParams){
            return Restangular
              .one('jobs',$stateParams.jobId)
              .get()
              .then(function(job){
                return job;
              })
              .catch(function(){
                return console.log("Error while get job details")
              })
          }
        }
      })
      .state('jobs-applicants-new', {
        url: '/jobs/:jobId/applicants/new',
        templateUrl: 'app/routes/jobs/applicants/new/new.html',
        controller: 'ApplicantNewController',
        controllerAs: 'ApplicantNew',
        resolve:{
          currentJob: function(Restangular,$stateParams){
            return Restangular
              .one('jobs',$stateParams.jobId)
              .get()
              .then(function(job){
                return job;
              })
              .catch(function(){
                return console.log("Error while get job details")
              })
          }
        }
      })
      .state('jobs-references-view', {
        url: '/jobs/:jobId/references/:referenceId',
        templateUrl: 'app/routes/jobs/references/view/view.html',
        controller: 'JobReferenceViewController',
        controllerAs: 'JobsReferenceView',
        resolve:{
          currentJob: function(Restangular,$stateParams){
            return Restangular
              .one('jobs',$stateParams.jobId)
              .get()
              .then(function(job){
                return job;
              })
              .catch(function(){
                return console.log("Error while get job details")
              })
          }
        }
      });
  });


