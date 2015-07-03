(function() {
  'use strict';

  angular
    .module('eo')
    .controller('PostsController',
      ['Post', PostsController]);

  function PostsController(Post) {

    var vm = this; //eslint-disable-line

    vm.posts = Post.all;

    activate();


    /***** UTILITY FUNCTIONS *****/
    function activate() {
      Post.getAll()
        .success(function (data) {
          vm.posts = Post.all;
        });
    }
  }
})();
