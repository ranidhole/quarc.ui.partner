angular.module('uiGenApp')
  .controller('JobViewController',
    function JobViewCtrl(QuarcService, Restangular, $stateParams, $sce, QCONFIG, currentJob) {
      const Jobs = QuarcService.Jobs;
      const Page = QuarcService.Page;

      const vm = this;
      vm.job = currentJob;
      vm.buckets = QCONFIG.APPLICANT_STATES;
      vm.data = {};
      vm.loadJob = function loadJob() {
        vm.ui = { loading: true };
        Page.setTitle(`${currentJob.role} - ${currentJob.client_name}`);
        vm.data = currentJob;
        vm.responsibility = $sce.trustAsHtml(currentJob.responsibility);
        vm.interview_addr = $sce.trustAsHtml(currentJob.interview_addr);
        vm.interview_place_direction = $sce.trustAsHtml(currentJob.interview_place_direction);

        // data has been loaded
        vm.ui.loading = false;

      };

      vm.loadJob();
    });
