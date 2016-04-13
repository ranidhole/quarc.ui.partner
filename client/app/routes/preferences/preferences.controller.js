'use strict';

angular.module('uiGenApp')
  .controller('PreferencesCtrl', function (Restangular) {
    var vm = this;

     Restangular.one('clients','preferences').get().then(re =>{
       vm.data = re;
     })

    vm.toggleSelect = function(array,flag){
        return array.forEach(function(ctcRange){ ctcRange.selected = flag; return ctcRange})
    }

  });
