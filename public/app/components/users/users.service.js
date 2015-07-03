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
      // return $http({
      //     method: 'POST',
      //     url: usersUrl,
      //     data: userData,
      //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      // })
      return $http.post(usersUrl, userData)
        .success(function handleCreateSuccess(data) {
          console.log('Success');
          console.log(data);
        })
        .error(function handleCreateError(data) {
          console.log('Failure');
          console.log(data);
        });
    }

    function update(id, userData) {
      return $http.put(usersUrl + id, userData)
        .success(function handleUpdateSuccess(data) {
          console.log('Success');
          console.log(data);
        })
        .error(function handleUpdateError(data) {
          console.log('Failure');
          console.log(data);
        });
    }
  }
})();
