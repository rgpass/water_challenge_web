angular
  .module('eo', [
    'app.routes',
    'app.users',
    'app.auth',
    'app.posts'
  ])
  .config(function($httpProvider) {
    // Attach our auth interceptor to each http request
    $httpProvider.interceptors.push('AuthInterceptor');
  });
