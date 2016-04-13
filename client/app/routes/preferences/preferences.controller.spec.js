'use strict';

describe('Controller: PreferencesCtrl', function () {

  // load the controller's module
  beforeEach(module('uiGenApp'));

  var PreferencesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreferencesCtrl = $controller('PreferencesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
