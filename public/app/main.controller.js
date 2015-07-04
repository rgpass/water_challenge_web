(function() {
  'use strict';

  angular
    .module('eo')
    .controller('MainController',
      ['$rootScope', '$state', 'Auth', MainController]);

  function MainController($rootScope, $state, Auth) {

    var vm = this; //eslint-disable-line

    vm.doLogout = doLogout;
    vm.isLoggedIn = Auth.isLoggedIn(); // Get info if logged in

    // Check to see if a user is logged in on every request
    $rootScope.$on('$stateChangeStart', function() {
      vm.isLoggedIn = Auth.isLoggedIn();

      // Get user info on state change
      if (vm.isLoggedIn) {
        Auth.getUser()
          .success(function(data) {
            vm.user = data;
          });
      }
    });


    /***** UTILITY FUNCTIONS *****/
    function doLogout() {
      Auth.logout();
      vm.user = {}; // Reset all user info
      $state.go('app.login');
    }
  }

})();
