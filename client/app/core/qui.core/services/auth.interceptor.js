
angular.module('qui.core')
  .factory('AuthInterceptor', function AuthIterceptor($rootScope, $q, AUTH_EVENTS, Session,$injector,URLS,$window) {
      return {
        request: function request(config) {
          if (Session.isAuthenticated()) {
            config.headers.Authorization = 'Bearer ' + Session.getAccessToken();
          }

          return config;
        },
        // Todo: Improve security by enabling cookies
        // Todo: On access token expiry -> get refresh token
        // Intercept 401s and redirect you to login
        responseError(response) {
          if (response.status === 401) {
            // remove any stale tokens
            //$cookies.remove('token');
            Session.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            $window.location.href = `${URLS.ACCOUNTS}/logout`;
          }
          return $q.reject(response);
        }
      };
    })
  // this configs to initiated using provider
  .config([
    '$httpProvider',
    function httpIntercept($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    },
  ]);
