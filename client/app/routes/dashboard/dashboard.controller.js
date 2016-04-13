'use strict';

angular.module('uiGenApp')
  .controller('DashboardController', function(QuarcService, Restangular, moment,$scope) {
    const Page = QuarcService.Page;

    const vm = this;

    Page.setTitle('Dashboard');
    vm.Math = Math;
    vm.summary= {};
    vm.summary.EPCScreening = {size:60, animate:{duration:0,enabled:false},barColor:'#3950a0',scaleColor:false,lineWidth:5,lineCap:'butt'};
    vm.summary.EPCShortlist = {size:60, animate:{duration:0,enabled:false},barColor:'#187889',scaleColor:false,lineWidth:5,lineCap:'butt'};


    vm.getSummary = function getSummary() {
      Restangular
      .one('clients/dashboard')
      .get()
      //.get({ state_id: '1,5,8,9,17' })
      .then(function gotSummary(response) {
        vm.summary = response
        });
    };

    vm.getSummary();

    // Todo: Getting data directly from /applicants instead of /dashboard api

    //vm.getInterviews = function getInterviews() {
    //  Restangular
    //    .one('applicants')
    //    .get({
    //      fl: 'id,name,interview_type,interview_time,_root_',
    //      sort: 'interview_time ASC',
    //      interview_time: [
    //        moment().startOf('day').toISOString(),
    //        moment().endOf('week').toISOString(),
    //      ].join(','),
    //    })
    //    .then(function gotInterviews(response) {
    //      vm.interviews = response;
    //    });
    //};
    //
    //vm.getInterviews();
  });


