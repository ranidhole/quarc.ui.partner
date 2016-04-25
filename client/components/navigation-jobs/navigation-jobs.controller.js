'use strict';

angular.module('uiGenApp')
  .controller('NavigationJobsController', function(Restangular,$state,$timeout,$scope,$window){
    var initializing = true;
    var timeout = $timeout(function(){});
    const vm = this;

    vm.jobHref = function jobHref(jobId) {
      const states = ['job.applicants','job.applicants.new','job.references.list','job.interviews.list', 'job.view'];
      const name = ~states.indexOf($state.current.name) ? $state.current.name : states[0];
      // Todo: Temporary Hack
      var queryParams = $state.params.status ? '?status='+$state.params.status:"";
      return $state.href(name, {jobId},{absolute: true}) + queryParams;
    };

    vm.jobs = []; // collection of jobs
    vm.ui = { lazyLoad: true, loading: false }; // ui states
    vm.xquery = "";
    vm.params = { offset: 0, limit: 20, fl: 'id,role,job_status,owner_id', meta:true}; // GET query params

    vm.toggle={open:true,hold:false,closed:false}
    vm.params.status ="OPEN,HIGH_PRIORITY"

    // Accordion Expand/ Collapse
    $scope.$watch(function() {
      return vm.toggle
    },function asyncLoadMore(newToggle,oldToggle) {
      if (initializing) {
        $timeout(function() { initializing = false; }); // First time watcher not calling
      } else {
        if(vm.toggle.closed && vm.toggle.hold && vm.toggle.open){ // Search var watcher
          // Preserving current state to restore after search resets
          if(vm.params.status!="ALL"){ for(var i in oldToggle){  if(oldToggle[i]==true){vm.lastOpenedAccordion = i; } } }

          // When search model changes then All accordion true
          vm.params.status ="ALL"

          // When search model becomes blank, expand the accordion before the search
          if(vm.xquery == ""){ for(var i in vm.toggle){  vm.toggle[i] = (i==vm.lastOpenedAccordion)? true : false; } }

        } else { // accordion variable  watcher
          if(vm.toggle[vm.lastClosedAccordion] != true){ // when u expand the same accordion closed
            if(oldToggle.open !=true && vm.toggle.open == true){
              vm.params.status ="OPEN,HIGH_PRIORITY";
              vm.toggle = {open:true,hold:false,closed:false};
            } else if(oldToggle.hold !=true &&  vm.toggle.hold == true){
              vm.params.status ="HOLD";
              vm.toggle = {open:false,hold:true,closed:false};
            } else if(vm.toggle.closed == true){
              vm.params.status ="CLOSED";
              vm.toggle = {open:false,hold:false,closed:true};
            } else if(vm.lastOpenedAccordion && vm.xquery==""){ // when search model become empty by backspace
              vm.params.status = vm.lastOpenedAccordion=="open"?"OPEN,HIGH_PRIORITY": vm.lastOpenedAccordion.toUpperCase();
            } else{
               for(var i in oldToggle){  if( oldToggle[i]==true){vm.lastClosedAccordion = i; } }
              // When all accordion collapsed, do nothing
              return
            }
          } else {
            // when reexpand just closed accordion, do nothing
            return
          }
        }

        $timeout.cancel(timeout); //cancel the last timeout
        // to avoid calling loadMore() on loading of page

        timeout = $timeout(function(){
          vm.loadJobs(true)
        }, 800);
      }

    } ,true);

    // Search
    $scope.$watch(function() {
      return {a:vm.xquery, };//b:vm.toggle
    },function asyncLoadMore() {
      if (initializing) {
        $timeout(function() { initializing = false; }); // First time watcher not calling
      } else {
        $timeout.cancel(timeout); //cancel the last timeout
        // to avoid calling loadMore() on loading of page

        timeout = $timeout(function(){
          vm.toggle = {open:true,hold:true,closed:true,reset:~vm.toggle.reset}
        }, 800);
      }

    } ,true);

    vm.loadJobs = function loadJobs(refresh) {
      if (refresh) {
        vm.params.offset = 0;
        vm.ui.lazyLoad = true;
        vm.jobs = [];

        // Move to top if fresh request required
        $window.scrollTo(0,0);
      }

      if (!vm.ui.lazyLoad) return; // if no more jobs to get
      vm.ui = { lazyLoad: false, loading: true };
      vm.params.query = vm.xquery;

      var firstPage = vm.params.offset === 0 ? true : false

      Restangular.all('jobs').customGET('', vm.params).then(function(response) {

        if (typeof response === 'undefined') {
          !refresh ? null : (vm.jobs = []);
          vm.ui.lazyLoad = false;
          return;
        }

        if(firstPage){
          vm.meta = response.meta;
        }
        var jobs = response.jobs
        angular.forEach(jobs, function iterateJobs(job) {
          vm.jobs.push(job);
        });

        // data has been loaded
        vm.ui.loading = false;

        // check for returned results count and set lazy loadLoad false if less
        vm.ui.lazyLoad = angular.equals(jobs.length, vm.params.limit) ? true : false;

        // increment offset for next loading of results
        vm.params.offset = vm.params.offset + vm.params.limit;


      }).catch(function(err){
        console.log('There was problem loading data. Please contact QuezX team');
        !refresh ? null : (vm.jobs = []);
        vm.ui.lazyLoad = false;
        return;
      });;
    };

    vm.loadJobs();
    vm.alert = function(){
      alert();
    }
  });
