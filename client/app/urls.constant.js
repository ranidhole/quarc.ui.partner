(function(angular, undefined) {
'use strict';

angular.module('uiGenApp.config', [])

.constant('URLS', {QUARC_API:'http://api.quezx.dev/api',ACCOUNTS:'//accounts.quezx.dev',OAUTH:'//accounts.quezx.dev/authorise?client_id=partnerquezx&response_type=code&redirect_uri=http://partner.quezx.dev/access/oauth&state=yo',STACKTRACEJS:false})

.constant('ENV', 'development')

;
})(angular);