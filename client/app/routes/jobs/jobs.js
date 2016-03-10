'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobs', {
        url: '/jobs',
        templateUrl: 'app/routes/jobs/list/list.html',
        controller: 'JobsListCtrl',
        controllerAs: 'JobsList',
      })
      .state('jobs-manage', {
        url: '/jobs/:jobId/manage?bucket',
        templateUrl: 'app/routes/jobs/manage/manage.html',
        controller: 'JobsManageController',
        controllerAs: 'JobsManage',
        resolve:{
          currentJob: function(Restangular,$stateParams){
            console.log("manage resolve jobId",$stateParams.jobId)
            return Restangular
              .one('jobs',$stateParams.jobId)
              .get({fl: 'id,role'})
              .then(function(job){
                return job;
              })
              .catch(function(){
                return alert("Error while get job details")
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
        controllerAs: 'JobView'
      })
      .state('jobs-applicants-new', {
        url: '/:jobId/applicants/new',
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
                return alert("Error while get job details")
              })
          }
        }
      });
  });


