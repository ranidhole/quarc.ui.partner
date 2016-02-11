'use strict';

describe('Controller: ApplicantsController', function() {

  // load the controller's module
  beforeEach(module('quarcUiPartnerApp'));
  beforeEach(module('stateMock'));

  var scope;
  var ApplicantsController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    ApplicantsController = $controller('ApplicantsController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    $httpBackend.flush();
    ApplicantsController.awesomeThings.length.should.equal(4);
  });
});
