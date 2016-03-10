(function(angular, undefined) {
'use strict';

angular.module('uiGenApp.constants', [])

.constant('QCONFIG', {ENV:'development',APPLICANT_STATES:['Tasks','Shortlisted','Feedback','Rejected','All'],MANAGE_JD_STATES:['New','Accepted','Hidden','Rejected','All']})

;
})(angular);