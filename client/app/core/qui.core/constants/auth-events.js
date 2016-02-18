angular.module('qui.core')
  .constant('AUTH_EVENTS', {
    loginConfirmed: 'event:auth-loginConfirmed',
    loginCancelled: 'event:auth-loginCancelled',
    logoutConfirmed: 'event:auth-logoutConfirmed',
    loginRequired: 'event:auth-loginRequired',
    forbidden: 'event:auth-forbidden',
  })
