'use strict';

angular.module('uiGenApp')
  .controller('CalendarCtrl', function (QuarcService, Restangular, $scope, moment, $state) {
    const Page = QuarcService.Page;

    const vm = this;
    Page.setTitle('Scheduled Interview Calendar');
    vm.colors = { 5: 'success', 8: 'warning', 17: 'info' };
    vm.applicants = []; // collection of applicants
    vm.ui = { lazyLoad: true, loading: false }; // ui states

    // GET query params
    vm.params = {
      offset: 0, limit: 30,
      fl: 'id,name,state_id,state_name,interview_time,interview_type,_root_',
    };

    vm.calendarView = 'month';
    vm.calendarDay = moment().toDate();
    $scope.$watch(function calendarDay() {
      // watch for change of start of month
      return moment(vm.calendarDay).startOf('month').toISOString();
    }, function calendarDayWatch() {
      // Reset controller variables to default
      vm.applicants = [];
      vm.ui = { lazyLoad: true, loading: false };
      vm.params.offset = 0; // Reset result offset
      vm.loadApplicants();
    }, true);

    vm.isCellOpen = true;
    vm.loadApplicants = function loadApplicants() {
      if (!vm.ui.lazyLoad) return; // if no more applicants to get
      vm.ui = { lazyLoad: false, loading: true };

      // set interview_time range using latest calendar day
      vm.params.interview_time = [
        //moment(vm.calendarDay).startOf('month').toISOString()
        '2016-01-01T18:30:00.000Z',
        moment(vm.calendarDay).endOf('month').toISOString(),
      ].join(',');
      Restangular
        .one('applicants')
        .get(vm.params)
        .then(function applicants(result) {
        angular.forEach(result, function iterateApplicants(applicant) {
          vm.applicants.push({
            title: `
                <a href="${$state.href('job.view', { jobId: applicant._root_.id }) }" target="_blank">
                  <span class="text-${vm.colors[applicant.interview_type]}-lter">${applicant._root_.role}</span>
                </a> –
                <a href="${$state.href('applicant.view', { applicantId: applicant.id })}" target="_blank">
                  <span class="text-${vm.colors[applicant.interview_type]}-lter">${applicant.name}</span>
                </a> &nbsp;
                <span class="h6 b-a b-${vm.colors[applicant.interview_type]}">&nbsp; ${applicant.state_name} &nbsp;
                </span> &nbsp;
              `,
            type: vm.colors[applicant.interview_type],
            startsAt: moment(applicant.interview_time).toDate(),
            endsAt: moment(applicant.interview_time).add(1, 'hours').toDate(),
          });
        });

        // data has been loaded
        vm.ui.loading = false;

        // check for returned results count and set lazy loadLoad false if less
        vm.ui.lazyLoad = angular.equals(result.length, vm.params.limit) ? true : false;

        // increment offset for next loading of results
        vm.params.offset = vm.params.offset + vm.params.limit;
        vm.loadApplicants();
      });
    };
  });
