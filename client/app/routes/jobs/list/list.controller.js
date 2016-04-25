angular.module('uiGenApp')
  .controller('JobsListController',
    function JobsListController(QuarcService, Restangular, $stateParams, QCONFIG, $location, $state, $scope, $timeout, $window) {
      var initializing = true;
      var timeout = $timeout(function(){});
      const Page = QuarcService.Page;
      const vm = this;

      vm.allStatus =  QCONFIG.MANAGE_JD_STATES;
      $stateParams.status = $stateParams.status || $location.search().status

      // Set default status to ALL
      if (!~vm.allStatus.indexOf($stateParams.status)) return $state.go('jobs.list',{status:QCONFIG.MANAGE_JD_STATES[0]});

      vm.pageStatus = $stateParams.status;
      Page.setTitle(`${$stateParams.status} - Allocated Jobs`);

      vm.jobs = []; // collection of jobs
      vm.ui = { lazyLoad: true, loading: false }; // ui states
      vm.xquery = "";
      // Scale: Angular search implemented, Need to Implement server side search when list grows bigger than 100
      vm.params = { offset: 0, limit: 100,  q:vm.xquery||''}; // GET query params orderBy, orderByReverse


      // Search
      $scope.$watch(function() {
        return vm.xquery;
      },function asyncLoadMore() {
        if (initializing) {
          $timeout(function() { initializing = false; }); // First time watcher not calling
        } else {
          $timeout.cancel(timeout); //cancel the last timeout
          // to avoid calling loadMore() on loading of page

          timeout = $timeout(function(){
            vm.loadJobs(true)
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
        vm.params.q = vm.xquery || '';


        vm.params.status = $stateParams.status.replace(' ', '_').toUpperCase();
        var firstPage = vm.params.offset === 0 ? true : false

        Restangular
          .all('jobs')
          .customGET("allocationStatusNew", vm.params)
          .then(function jobList(response) {
            // Handle error for php error
            if (typeof response === 'undefined') {
              !refresh ? null : (vm.jobs = []);
              vm.ui.lazyLoad = false;
              return;
            }

            if(firstPage){
              vm.meta = response.meta;
            }
            var jobs = response.jobs;
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
        });
      };

      vm.loadJobs();






      vm.order = "-score"
      vm.orderBy = function(field) {
        (vm.order === field) ?
          // current field clicked again => toggle order
          (vm.order = '-'+field) :
          // order by field
          (vm.order = field); //
      };


      vm.updateResponse = function(job) {
        Restangular.one('jobs',job.id )
          .all("consultantResponse")
          .post({responseId:job.response_id,allocationId:job.allocation_id})
          .then(function(res){
            if($stateParams.status != 'All'){
              vm.jobs = _.remove(vm.jobs,function(item){return item.id !== job.id})
            }

            // Local Syncing Count in header pills
            var jobsLength = vm.jobs.length;
            vm.meta.jobsCount.map(function(item){
              // Decrement source
              //item.count =  (item.id == job.oldResponseId) ? jobsLength : item.count;
              if(item.id == job.oldResponseId){
                item.count--
              }

              // Increment dest
              if(item.id == job.response_id){ // New Response Id
                item.count++
              }
              return item;
            })
            // deleting oldResponseId created in ng-int
            if($stateParams.status != 'All'){
              delete job.oldResponseId
            } else {
              job.oldResponseId = job.response_id
            }
          })
          .catch(function(err){
            console.log("Server Error while updating consultant response")
          })

      }
    });
