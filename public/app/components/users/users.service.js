(function() {
  angular
    .module('app.users', [])
    .service('User',
      ['$http', User])

  function User($http) {
    var usersUrl = '/api/users/';

    this.create = create;
    this.update = update;


    /***** UTILITY FUNCTIONS *****/
    function create(userData) {
      return $http.post(usersUrl, userData)
        .error(function handleCreateError(data) {
          console.log('Failure');
          console.log(data);
        });
    }

    function update(id, userData) {
      return $http.put(usersUrl + id, userData)
        .error(function handleUpdateError(data) {
          console.log('Failure');
          console.log(data);
        });
    }
  }
})();
