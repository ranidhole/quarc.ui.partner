'use strict';

describe('Controller: JobsCtrl', function () {

  // load the controller's module
  beforeEach(module('uiGenApp'));

  var JobsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobsCtrl = $controller('JobsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
