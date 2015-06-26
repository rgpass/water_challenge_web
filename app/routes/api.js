var User = require('../models/user.js');

module.exports = function (app, express) {
  // Set up instance of Express Router
  var apiRouter = express.Router();

  // Test that env is set up
  apiRouter.get('/', function (req, res) {
    res.json({ message: 'API router is live!' });
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

        res.json({ message: 'User created!' });
      });
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

        console.log(user);
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

  return apiRouter;
};
