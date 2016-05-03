angular.module('uiGenApp')
  .controller('AllotedToNewController', function AllotedToNewCtrl($uibModalInstance, ApplicantName,ids, URLS, $window, Session,Restangular,$state) {
      const vm = this;
      vm.concat = 'true'; // download cv type default to with CTC

      vm.applicantName =ApplicantName;
      vm.applicantID = ids;


    //console.log(vm.aptID);
      vm.Clients = {
        select: function ($item) {
          if ($item.id) {
            vm.Clients.id = $item.id;
            vm.Clients.model = $item.name;
          }
        },

      get: function (search) {
        return Restangular.all('search')
          .getList({ q: search, type: 'current_consultant_alloc_job_clients' })
          .then(function (response) {
            //var selectedRegionIds = _.pluck(vm.data.Clients,'id')
            //response = _.filter(response,function(client){ return -1 === selectedRegionIds.indexOf(client.id)})
            return response.map(function iterate(value) {

              return value;
            });
          });
      },

      create: function (skill, required) {
        return Restangular.all('clients')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.Clients.selectRequired($item);
            }

            return vm.Clients.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    };

    vm.Positions = {
      select: function ($item,$model,$label,$event) {
        if ($item.id) {
          vm.Positions.id = $item.id;
          vm.Positions.model = $item.name;
        }
      },
      get: function (search) {
        var clientID =  vm.Clients.id
        if(!clientID) return []

          return Restangular.all('search')
            .getList({q: search, type: 'current_consultant_alloc_jobs_by_client', id: clientID})
            .then(function (response) {
              response = response.plain()
              return response.map(function iterate(value) {
                return value;
              });
            });

      },

      create: function (skill, required) {
        return Restangular.all('Jobroles')
          .post({ name: skill })
          .then(function(response) {
            const $item = {
              id: response.id,
              name: response.name,
            };

            if (required) {
              return vm.Jobroles.selectRequired($item);
            }

            return vm.Jobroles.selectOptional($item);
          });
      },

      noResults: false,
      loadingClients: false,
    }

    vm.ok = function ok() {
        $uibModalInstance.close(vm.concat);
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };

      vm.submitform= function submitform(){
        Restangular.one('jobs',vm.Positions.id).all('applicants/reapply').post({applicant_id:vm.applicantID}).then(function createNewApplicant(data) {

          $state.go('applicant.view',{applicantId:data.id});
          $uibModalInstance.close(true);
        }).catch(function(error) {

          vm.errorMessage = error.data.message
          //alert("error");
        });
      }
    });
