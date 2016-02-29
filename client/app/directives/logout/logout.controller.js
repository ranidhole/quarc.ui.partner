angular.module('uiGenApp')
  .controller('LogoutController',
    function LogoutController(URLS,$rootScope, $state, $q, Auth, AUTH_EVENTS, $window ,Session) {
      const vm = this;
      vm.init = function logout() {
        // Try to logout Todo: service level logout
        //Auth.logout()
        //  .then(
        //    function handleLogin() {
        //      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
              Session.destroy();
              $window.location.href = `${URLS.ACCOUNTS}/logout`;
      //      },
      //
      //      function handleError() {
      //        $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
      //        $window.location.href = `${URLS.ACCOUNTS}/logout`;
      //      }
      //    );
      };
    });
