var User      = require('../models/user.js'),
  Post        = require('../models/post.js'),
  jwt         = require('jsonwebtoken'),
  config      = require('../../config.js'),
  superSecret = config.secret;

module.exports = function (app, express) {
  // Set up instance of Express Router
  var apiRouter = express.Router();

  // Test that env is set up
  apiRouter.get('/', function (req, res) {
    res.json({ message: 'API router is live!' });
  });

  apiRouter.post('/authenticate', function (req, res) {
    User.findOne({
      email: req.body.email
    }).select('name email username password').exec(function (err, user) {
      if (err) { throw err; }

      // If no user found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        })
      } else if (user) {
        // Undefined pw will give bCrypt an error
        req.body.password = req.body.password || '';
        var validPassword = user.comparePassword(req.body.password);

        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          })
        } else {
          var token = jwt.sign({
            name: user.name,
            username: user.username,
            email: user.email
          }, superSecret, {
            expiresInMinutes: 1440 // 24 hrs
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });

  // Routes for /users
  apiRouter.route('/users')
    // GET /api/users -- users#index
    .get(function (req, res) {
      User.find(function (err, users) {
        if (err) { res.send(err); }

        res.json(users);
      });
    })

    // POST /api/users -- users#create
    // NOTE: Requires x-www-form-urlencoded, NOT form-data or raw
    .post(function (req, res) {
      var user = new User();

      user.name     = req.body.name;
      user.email    = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;

      user.save(function (err) {
        if (err) {
          // Handle duplicate entry
          if (err.code == 11000) {
            return res.json({ success: false, message: 'Username already exists.' });
          } else {
            return res.send(err);
          }
        }

        res.json({ success: true, message: 'User created!' });
      });
    });

  apiRouter.route('/posts')
    .get(function postsIndex(req, res) {
      Post.find(function (err, posts) {
        if (err) { res.send(err); }

        res.json(posts);
      });
    })

  // Middleware for all API requests that
  // validates the token
  apiRouter.use(function (req, res, next) {
    console.log('Someone came to our app!');

    // Accept token from POST params, URL params, or HTTP header
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      // Verify secret and check expiration
      jwt.verify(token, superSecret, function (err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          // If good, save to req for use in other routes
          // decoded is the user as seen in the /api/me route.
          req.decoded = decoded;

          next(); // Can only move to next if verified
        }
      });
    } else { // If no token
      return res.status(403).send({ // 403 Forbidden
        success: false,
        message: 'No token provided.'
      });
    }
  });

  apiRouter.get('/test', function (req, res) {
    res.json({ message: 'You passed!' })
  });



  apiRouter.route('/users/:user_id')
    // GET /api/users/:user_id -- users#show
    .get(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) { res.send(err); }

        res.json(user);
      })
    })

    // PUT /api/users/:user_id -- users#update
    // NOTE: Requires x-www-form-urlencoded, NOT form-data or raw
    .put(function(req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) { res.send(err); }

        if (req.body.name) { user.name = req.body.name; }
        if (req.body.email) { user.email = req.body.email; }
        if (req.body.username) { user.username = req.body.username; }
        if (req.body.password) { user.password = req.body.password; }

        user.save(function(err) {
          if (err) { res.send(err); }

          res.json({ message: 'User updated!' });
        });

      });
    })

    // DELETE /api/users/:user_id -- users#destroy
    .delete(function (req, res) {
      User.remove({ _id: req.params.user_id }, function (err, user) {
        if (err) { return res.send(err); }

        res.json({ message: 'Successfully deleted.' });
      });
    });

  apiRouter.get('/me', function (req, res) {
    res.send(req.decoded);
  });

  apiRouter.route('/posts')
    .post(function postsCreate(req, res) {

      if (!req.decoded) {
        res.json({ success: false, message: 'No user info detected' });
      } else {
        var user = req.decoded,
          post = new Post();

        if (isNaN(Number(req.body.volume))) {
          res.json({ success: false, message: 'Enter a number in ounces.'})
        }

        // Remove useless variables
        user.iat = undefined;
        user.exp = undefined;

        post.volume = req.body.volume;
        post.user = user;
        post.date = Date.now();

        post.save(function (err) {
          if (err) {
            return res.send(err);
          }

          res.json({ success: true, message: 'Water tracked!', post: post })
        });
      }
    })

  return apiRouter;
};
