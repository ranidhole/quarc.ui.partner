angular.module('uiGenApp')
  .run(function handleEvents($rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $window, URLS,Poller) {
      /* eslint angular/on-watch: 0 */

       //In Future: assign to variable to destroy during the $destroy event
      $rootScope.$on('$stateChangeStart', function handleStateChange(event, next) {
        if (!Session.isAuthenticated() && (next.name.split('.')[0] !== 'access')) {
          event.preventDefault();
          $window.location.href = URLS.OAUTH;
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

        if (Session.isAuthenticated() && (next.name === 'access.oauth')) {
          event.preventDefault();
          $state.go('dashboard');
        }
      });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function loginSuccess(event, data) {
        angular.noop(event);
        angular.noop(data);
      });

      $rootScope.$on(AUTH_EVENTS.loginRequired, function loginRequired() {
        console.log("s",Auth)
        if (Session.isAuthenticated()) {
          // Refresh token autimatically if token expires
          Auth.refreshToken().then(
            function gotRefreshToken() {
              authService.loginConfirmed('success', function updateConfig(config) {
                config.headers.Authorization = 'Bearer ' + Session.getAccessToken();
                return config;
              });
            },

            function errRefreshToken(error) {
              if (error.error_description === "Refresh token has expired") {
                // remove any stale tokens
                //$cookies.remove('token');
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                $window.location.href = URLS.OAUTH;
              }
              angular.noop(error);
            }
          );
        }
      });
    });
