(function() {
  'use strict';

  angular
    .module('eo')
    .controller('NewUserController',
      ['$state', 'Auth', 'User', NewUserController]);

  function NewUserController($state, Auth, User) {

    if (Auth.isLoggedIn()) {
      $state.go('app.home');
    }

    var vm = this; //eslint-disable-line

    vm.doSignup = doSignup;
    vm.errorMessage = '';
    vm.processing = 0;
    vm.signupData = {};


    /***** UTILITY FUNCTIONS *****/
    function doSignup() {
      vm.processing++;
      vm.errorMessage = '';

      User.create(vm.signupData)
        .success(function handleLoginSuccess(data) {
          vm.processing--;

          // If successful signup
          if (data.success) {
            $state.go('app.login');
          } else {
            vm.errorMessage = data.message;
          }
        });
    }
  }
})();
