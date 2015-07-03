(function() {
  'use strict';

  angular
    .module('eo')
    .controller('NewPostController',
      ['Post', NewPostController]);

  function NewPostController(Post) {

    var vm = this; //eslint-disable-line

    vm.volume = 8;
    vm.save = save;
    vm.processing = 0;


    /***** UTILITY FUNCTIONS *****/
    function save() {
      vm.processing++;
      Post.create(vm.volume)
        .success(function (data) {
          vm.processing--;
          vm.posts = data;
        })
        .error(function() {
          vm.processing--;
        });
    }
  }
})();
