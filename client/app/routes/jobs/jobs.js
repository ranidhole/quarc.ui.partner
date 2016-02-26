'use strict';

angular.module('uiGenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobs', {
        abstract: true,
        url: '/jobs',
        templateUrl: 'app/routes/jobs/jobs.html',
        controller: 'JobsCtrl'
      })
      .state('jobs.new', {
        url: '/new',
        templateUrl: 'app/routes/jobs/new/new.html',
      })
      .state('jobs.list', {
        url: '/',
        templateUrl: 'app/routes/jobs/list/list.html',
        controller: 'JobsCtrl',
        controllerAs: 'Jobs',
      })
      .state('jobs.manage', {
        url: '/manage/:jobId?bucket',
        templateUrl: 'app/routes/jobs/manage/manage.html',
        authenticate: true
      })
      .state('jobs.manage-jd', {
        url: '/manage-jd',
        templateUrl: 'app/routes/jobs/manage-jd/manage-jd.html',
        authenticate: true
      })
      .state('jobs.view', {
        url: '/:jobId',
        templateUrl: 'app/routes/jobs/view/view.html',
        controller: 'JobViewController',
        controllerAs: 'JobView'
      });
  });


