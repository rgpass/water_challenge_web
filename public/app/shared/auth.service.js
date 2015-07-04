// ===================================================
// AuthToken: token auth functions (get the token, save the token)
// Auth: main auth functions (login, logout, get current user, check if logged in)
// AuthInterceptor: auth interceptor (attach the token to HTTP requests, redirect if not logged in)
// ===================================================

(function() {
  angular
    .module('app.auth', [])
    .factory('AuthToken',
      ['$window', AuthToken])

  function AuthToken($window) {
    var authTokenFactory = {
      getToken: getToken,
      setToken: setToken
    }
    return authTokenFactory;


    /***** UTILITY FUNCTIONS *****/
    function getToken() {
      return $window.localStorage.getItem('token');
    }

    function setToken(token) {
      // Set or clear token
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    }
  }
})();

(function() {
  angular
    .module('app.auth')
    .factory('Auth',
      ['$http', '$q', 'AuthToken', Auth])

  function Auth($http, $q, AuthToken) {
    var authFactory = {
      isLoggedIn: isLoggedIn,
      getUser: getUser,
      login: login,
      logout: logout
    }
    return authFactory;


    /***** UTILITY FUNCTIONS *****/
    function isLoggedIn() {
      if (AuthToken.getToken()) {
        return true;
      } else {
        return false;
      }
    }

    function getUser() {
      if (AuthToken.getToken()) {
        // After first req, store response in cache
        return $http.get('/api/me', { cache: true });
      } else {
        // $q is a promise obj, thus can run it similar
        // to a response from $http
        return $q.reject({ message: 'User has no token.' });
      }
    }

    function login(email, password) {
      var data = {
        email: email,
        password: password
      };

      return $http.post('/api/authenticate', data)
        .success(function(data) {
          AuthToken.setToken(data.token);
          return data;
        });
    }

    function logout() {
      // Clear token
      AuthToken.setToken();
    }
  }
})();

(function() {
  angular
    .module('app.auth')
    .factory('AuthInterceptor', ['$q', 'AuthToken', '$location', AuthInterceptor]);

  function AuthInterceptor($q, AuthToken, $location) {
    var interceptorFactory = {
      request: request,
      responseError: responseError
    };
    return interceptorFactory;


    /***** UTILITY FUNCTIONS *****/
    // Attach token to every request
    function request(config) {
      var token = AuthToken.getToken();

      if (token) { config.headers['x-access-token'] = token; }

      return config;
    }

    // Redirect if a token doesn't authenticate
    function responseError(response) {
      if (response.status === 403) {  // 403 == Forbidden
        AuthToken.setToken();         // Clear token
        $location.path('/login');     // Redirect to login page
      }

      // Return errors from the server as a promise
      return $q.reject(response);
    }
  }
})();
