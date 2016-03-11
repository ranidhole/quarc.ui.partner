'use strict';

angular.module('uiGenApp')
  .controller('AppController', function (QuarcService, $window, $uibModal, $state, $rootScope, Restangular) {
    const Page = QuarcService.Page;
    const Session = QuarcService.Session;
    const User = QuarcService.User;

    const vm = this;

    // config
    vm.app = {
      name: 'QUEZX',
      version: '0.0.1',
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-white',
        navbarCollapseColor: 'bg-white-only',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: true,
        asideFolded: true,
        asideDock: true,
        container: false,
        offScreen: false, // flag for show of sidebar for mobile view
        mobileHeader: false, // flag to show header Nav and Search in mobile view
      },
    };

    // keeps track of state change and hides sidebar view for mobile
    /* eslint angular/on-watch: 0 */
    $rootScope.$on('$stateChangeStart', function handleStateChange() {
      vm.app.settings.offScreen = false;
      vm.app.settings.mobileHeader = false;
    });

    vm.Page = Page; // Set Page title

    // Applicant search related Functions
    vm.Applicants = {
      select: function gotoApplicant($item) {
        vm.Applicants.searchText = '';
        $state.go('applicants-view', { applicantId: $item.id });
      },

      get: function searchApplicants(searchText) {
        return Restangular
          .all('search')
          .getList({ type:'applicants', q: searchText, offset: 0, limit: 15, fl: 'id,name'})
          .then(function gotApplicants(response) {
            return response;
          });
      },

      noResults: false,
      loadingRegions: false,
    };

    vm.interviewUI = {
      5: {
        icon: 'phone',
        color: 'success',
      },
      8: {
        icon: 'user',
        color: 'warning',
      },
      17: {
        icon: 'skype',
        color: 'info',
      },
    };

    // Todo : Temporary fix | Fallaback
    if(localStorage.userinfo)
      vm.userinfo = User.userinfo;
    else {
      Restangular
        .one('users','me')
        .get()
        .then(userinfo => {
          vm.userinfo = userinfo;
          localStorage.userinfo = JSON.stringify(userinfo)
        }).catch(err => {
          console.log("Error while getting user states")
      })
    }

    // Todo : Temporary fix | Fallaback
    if(localStorage.states){
      vm.states = User.states;
    } else {
      Restangular
        .one('users','states')
        .get()
        .then(states => {
          vm.states = states
          localStorage.states = JSON.stringify(states)
        }).catch(err => {
        console.log("Error while getting user states")
      })
    }

    vm.showNavJobs = function showNavJobs() {
      return $state.is('applicants') || $state.is('jobs-view') || $state.is('jobs-manage') || $state.is('jobs-applicants-new') || $state.is('jobs-references');
    };

    vm.downloadApplicant = function downloadApplicant(ids) {
      // ApplicantIds is array contatining applicant id to download cvs
      const modalInstance = $uibModal.open({
        templateUrl: 'app/directives/download-resume/download-resume.html',
        controller: 'DownloadResumeController',
        controllerAs: 'DownloadResume',
        size: 'sm',
        resolve: {
          ApplicantIds: function ApplicantIds() {
            return ids;
          },
        },
      });

      modalInstance.result.then(function success() {
        // console.log(type);
      });
    };

    vm.addFollower = function addFollower(follower, applicantId) {
      // ApplicantIds is array contatining applicant id to download cvs
      const modalInstance = $uibModal.open({
        templateUrl: 'app/directives/download-resume/download-resume.html',
        controller: 'AddFollowerController',
        controllerAs: 'AddFollower',
        size: 'md',
        resolve: {
          FollowerData: function FollowerData() {
            return follower[0];
          },

          ApplicantId: function ApplicantId() {
            return applicantId;
          },
        },
      });

      modalInstance.result.then(function success() {
        // console.log(type);
      });
    };

    vm.changeState = function changeState(applicant, stateId) {
      // ApplicantIds is array contatining applicant id to download cvs
      const modalInstance = $uibModal.open({
        templateUrl: 'app/directives/change-state/change-state.html',
        controller: 'ChangeStateController',
        controllerAs: 'ChangeState',
        bindToController: 'true',
        size: 'md',
        resolve: {
          applicant: applicant,
          stateId: stateId,
        },
      });

      modalInstance.result.then(function success(data) {
        applicant.state_id = data.state_id;
        applicant.state_name = vm.states[data.state_id].name;
      });
    };

    vm.shareLink = function shareLink(job) {
      // ApplicantIds is array contatining applicant id to download cvs
      const modalInstance = $uibModal.open({
        templateUrl: 'app/directives/social-share/social-share.html',
        controller: 'SocialShareController',
        controllerAs: 'SocialShare',
        size: 'md',
        resolve: {
          currentJob: function FollowerData() {
            return job;
          },
        },
      });

      modalInstance.result.then(function success() {
        // console.log(type);
      });
    };

  });
