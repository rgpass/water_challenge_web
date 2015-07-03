angular
  .module('app.routes', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'app/shared/header.view.html',
            controller: 'HeaderController as headerCtrl'
          },
          'content': {
            templateUrl: 'app/app.html'
          }
        }
      })
        .state('app.home', {
          url: '',
          views: {
            'new-post': {
              templateUrl: 'app/components/posts/new.post.view.html',
              controller: 'NewPostController as newPostCtrl'
            },
            'posts-index': {
              templateUrl: 'app/components/posts/posts.view.html',
              controller: 'PostsController as postsCtrl'
            }
          }
        })
        .state('app.login', {
          url: 'login',
          views: {
            'content@': {
              templateUrl: 'app/components/users/new.session.view.html',
              controller: 'NewSessionController as newSessionCtrl'
            }
          }
        })
        .state('app.users', {
          url: 'users',
          abstract: true
        })
          .state('app.users.new', {
            url: '/new',
            views: {
              'content@': {
                templateUrl: 'app/components/users/new.user.view.html',
                controller: 'NewUserController as newUserCtrl'
              }
            }
          });
  });

  // .state('login', {
  //   url: '/login',
  //   views: {
  //     'content@': {
  //       templateUrl: 'app/views/login.html',
  //       controller: 'mainController as login'
  //     }
  //   }
  // })
