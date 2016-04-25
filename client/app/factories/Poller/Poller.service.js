'use strict';

angular.module('uiGenApp')
  .factory('Poller', function(URLS, $http, $timeout) {
    var poller = function() {
      $http.get(URLS.QUARC_API+'/jobs/allocationStatusNewCount').then(function(r) {
        var object = { count : r.data.count, timestamp: new Date().getTime()}
        localStorage.setItem("Poller", JSON.stringify(object));
        $timeout(poller, 1000 * 60 *5);
      });
    };

    var object = JSON.parse(localStorage.getItem("Poller"));
    var now = new Date().getTime().toString();
    if (object) {
      var dateString = object.timestamp;
      console.log('object found',now,(dateString * 1000 * 60 * 0.1))
      if ((dateString * 1000 * 60 * 0.1) >= now ) {
        //time out, send an ajax call
        poller()
      }

    } else {
      poller()
      console.log("poller calling ")
      //if ((dateString * 1000 * 60 * 1) >= now ) {
      //  //time out, send an ajax call
      //  console.log("poller calling ")
      //
      //  return false;
      //}
    }
    var dataFactory = {
      newJobCount:function(){
        if(localStorage.Poller){
          var localData = JSON.parse(localStorage.Poller)
          if(localData) return localData.count
        }
        return
      }
    };

    return dataFactory;
  });
