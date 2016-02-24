angular.module('uiGenApp')
  .controller('DownloadResumeController', function DownloadResumeCtrl($uibModalInstance, ApplicantIds, APP_CONFIG, $window, Session) {
      const vm = this;
      vm.concat = 'true'; // download cv type default to with CTC

      if (!angular.isArray(ApplicantIds)) return;
      const token = Session.getAccessToken();
      if (ApplicantIds.length === 1) {
        vm.downloadUrl =
          `${APP_CONFIG.QUARC_API_URL}/applicants/${ApplicantIds[0]}/downloadResume?access_token=${token}`;
      }

      if (ApplicantIds.length > 1) {
        vm.downloadUrl =
          `${APP_CONFIG.QUARC_API_URL}/applicants/bulkResumeDownload?access_token=${token}&ids=${ApplicantIds.join(',')}`;
      }

      vm.ok = function ok() {
        $uibModalInstance.close(vm.concat);
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    });
