(function() {
  'use strict';

  angular
    .module('eo')
    .controller('NewUserController',
      ['$state', 'User', NewUserController]);

  function NewUserController($state, User) {

    var vm = this; //eslint-disable-line

    vm.doSignup = doSignup;
    vm.errorMessage = '';
    vm.processing = 0;
    vm.signupData = {};


    /***** UTILITY FUNCTIONS *****/
    function doSignup() {
      vm.processing++;
      vm.errorMessage = '';
      console.log(vm.signupData);
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
