angular.module('uiGenApp')
  .controller('JobPaymentController', function JobPaymentController($uibModalInstance, currentJob, Restangular,User) {
    const vm = this;
    vm.job  = currentJob;
    vm.jobCode = currentJob.job_code
    vm.userIdBase64 = btoa(User.userinfo.id)
    vm.ok = function ok() {

    };

    vm.cancel = function cancel() {
      $uibModalInstance.dismiss('cancel');
    };
  });
