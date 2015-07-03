(function() {
  'use strict';

  angular
    .module('eo')
    .controller('NewSessionController',
      ['$state', 'Auth', NewSessionController]);

  function NewSessionController($state, Auth) {
    var vm = this; //eslint-disable-line

    vm.doLogin = doLogin;
    vm.processing = 0;


    /***** UTILITY FUNCTIONS *****/
    function doLogin() {
      vm.processing++;
      vm.errorMessage = '';
      Auth.login(vm.loginData.email, vm.loginData.password)
        .success(function handleLoginSuccess(data) {
          console.log(data);
          vm.processing--;

          // If successful login
          if (data.success) {
            $state.go('app.home');
          } else {
            vm.errorMessage = data.message;
          }
        });
    }
  }
})();