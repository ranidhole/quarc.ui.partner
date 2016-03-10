'use strict';

describe('Service: stacktraceService', function () {

  // load the service's module
  beforeEach(module('uiGenApp'));

  // instantiate service
  var stacktraceService;
  beforeEach(inject(function (_stacktraceService_) {
    stacktraceService = _stacktraceService_;
  }));

  it('should do something', function () {
    !!stacktraceService.should.be.true;
  });

});
