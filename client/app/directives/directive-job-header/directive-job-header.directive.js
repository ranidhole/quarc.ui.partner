'use strict';

angular.module('uiGenApp')
  .directive('directiveJobHeader', function () {
    return {
      templateUrl: 'app/directives/directive-job-header/directive-job-header.html',
      restrict: 'EA',
      scope:{
        job: "=",
      },
      link: function (scope, element, attrs) {

      }
    };
  });

