'use strict';

describe('Directive: directiveJobHeader', function () {

  // load the directive's module and view
  beforeEach(module('uiGenApp'));
  beforeEach(module('app/directives/directive-job-header/directive-job-header.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<directive-job-header></directive-job-header>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the directiveJobHeader directive');
  }));
});
