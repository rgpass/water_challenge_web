(function() {
  'use strict';

  angular
    .module('eo')
    .controller('NewSessionController',
      ['$state', 'Auth', NewSessionController]);

  function NewSessionController($state, Auth) {

    if (Auth.isLoggedIn()) {
      $state.go('app.home');
    }

    var vm = this; //eslint-disable-line

    vm.doLogin = doLogin;
    vm.loginDate = {};
    vm.processing = 0;


    /***** UTILITY FUNCTIONS *****/
    function doLogin() {
      vm.processing++;
      vm.errorMessage = '';
      Auth.login(vm.loginData.email, vm.loginData.password)
        .success(function handleLoginSuccess(data) {
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
