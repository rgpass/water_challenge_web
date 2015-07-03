(function() {
  angular
    .module('app.posts', [])
    .service('Post',
      ['$http', Post])

  function Post($http) {
    var postsUrl = '/api/posts/';

    this.all = [];
    this.getAll = getAll;
    this.create = create;


    /***** UTILITY FUNCTIONS *****/
    function create(volume) {
      return $http.post(postsUrl, { volume: volume })
        .success(function handleCreateSuccess(data) {
          this.all.unshift(data.post);
          console.log('Success');
          console.log(data);
        }.bind(this))
        .error(function handleCreateError(data) {
          console.log('Failure');
          console.log(data);
        });
    }

    function getAll() {
      return $http.get(postsUrl)
        .success(function handleUpdateSuccess(data) {
          this.all = data.reverse();
          console.log('Success');
          console.log(data);
        }.bind(this))
        .error(function handleUpdateError(data) {
          console.log('Failure');
          console.log(data);
        });
    }
  }
})();
