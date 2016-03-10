'use strict';

angular.module('uiGenApp')
// The "stacktrace" library that we included in the Scripts
// is now in the Global scope; but, we don't want to reference
// global objects inside the AngularJS components - that's
// not how AngularJS rolls; as such, we want to wrap the
// stacktrace feature in a proper AngularJS service that
// formally exposes the print method.
.factory(
  "stacktraceService",
  function() {
    // "printStackTrace" is a global object.
    return({
      print: StackTrace
    });
  }
)
// -------------------------------------------------- //
// -------------------------------------------------- //
// By default, AngularJS will catch errors and log them to
// the Console. We want to keep that behavior; however, we
// want to intercept it so that we can also log the errors
// to the server for later analysis.
.provider(
  "$exceptionHandler",
  {
    $get: function( errorLogService ) {
      return( errorLogService );
    }
  }
)
// -------------------------------------------------- //
// -------------------------------------------------- //
// The error log service is our wrapper around the core error
// handling ability of AngularJS. Notice that we pass off to
// the native "$log" method and then handle our additional
// server-side logging.
.factory(
  "errorLogService",
  function( $log, $window, stacktraceService,URLS,QCONFIG ) {
    // I log the given error to the remote server.
    function log( exception, cause ) {
      // Pass off the error to the default error handler
      // on the AngualrJS logger. This will output the
      // error to the console (and let the application
      // keep running normally for the user).
      $log.error.apply( $log, arguments );
      // Now, we need to try and log the error the server.
      // --
      // NOTE: In production, I have some debouncing
      // logic here to prevent the same client from
      // logging the same error over and over again! All
      // that would do is add noise to the log.
      try {
        var errorMessage = exception.toString();
        stacktraceService.print.fromError(exception).then(function(stackTrace){
          // Log the JavaScript error to the server.
          // --
          // NOTE: In this demo, the POST URL doesn't
          // exists and will simply return a 404.
          // Todo: Replace with logstash url
          var url = URLS.QUARC_API + '/logs';
          if(QCONFIG.STACKTRACEJS){
            StackTrace.report(stackTrace, url);
          }

          //$.ajax({
          //  type: "POST",
          //  url: "./javascript-errors",
          //  contentType: "application/json",
          //  data: angular.toJson({
          //    errorUrl: $window.location.href,
          //    errorMessage: errorMessage,
          //    stackTrace: stackTrace,
          //    cause: ( cause || "" )
          //  })
          //});
        });

      } catch ( loggingError ) {
        // For Developers - log the log-failure.
        $log.warn( "Error logging failed" );
        $log.log( loggingError );
      }
    }
    // Return the logging function.
    return( log );
  }
);
