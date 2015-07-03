(function() {
  'use strict';

  angular
    .module('eo')
    .controller('MainController',
      ['$location', '$rootScope', 'Auth', MainController]);

  function MainController($location, $rootScope, Auth) {
    var vm = this; //eslint-disable-line

    vm.doLogout = doLogout;
    vm.isLoggedIn = Auth.isLoggedIn(); // Get info if logged in

    // Check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
      vm.loggedIn = Auth.isLoggedIn();

      // Get user info on route change
      Auth.getUser()
        .success(function(data) {
          vm.user = data;
        });
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      vm.loggedIn = Auth.isLoggedIn();

      // Get user info on route change
      Auth.getUser()
        .success(function(data) {
          vm.user = data;
        });
    });


    /***** UTILITY FUNCTIONS *****/
    function doLogout() {
      console.log('Logging out...');
      Auth.logout();
      vm.user = {}; // Reset all user info
      $location.path('/login');
    }
  }

})();
