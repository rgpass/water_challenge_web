module.exports = function (app, express) {
  // Set up instance of Express Router
  var apiRouter = express.Router();

  // Test that env is set up
  apiRouter.get('/', function (req, res) {
    res.json({ message: 'API router is live!' });
  });

  return apiRouter;
};
