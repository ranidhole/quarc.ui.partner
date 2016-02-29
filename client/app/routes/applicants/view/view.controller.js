angular.module('uiGenApp')
  .controller('ApplicantViewController', function ApplicantViewCtrl(QuarcService, Restangular, $stateParams, URLS, $sce, Page, Session) {
      //Page = QuarcService.Page;
      //Session = QuarcService.Session;

      const vm = this;
      vm.data = {};
      vm.trustSrc = function trustSrc(src) {
        return $sce.trustAsResourceUrl(src);
      };

      vm.resumeSrc = `${URLS.QUARC_API}/applicants/${$stateParams.applicantId}/getResume?access_token=${Session.getAccessToken()}`;
      vm.loadApplicant = function loadApplicant() {
        vm.ui = { loading: true };
        Restangular
          .one('applicants',$stateParams.applicantId)
          .get()
          .then(function gotApplicant(result) {
            vm.data = result;
            Page.setTitle(vm.data.name);

            // Loading Followers
            //Restangular
            //  .one('applicants',$stateParams.applicantId)
            //  .all('followers')
            //  .getList()
            //  .then(function gotFollower(fresult) {
            //    vm.data.follower = fresult;
            //  });

            // data has been loaded
            vm.ui.loading = false;
          });
      };

      vm.loadApplicant();
    });
