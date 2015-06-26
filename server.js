// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express   = require('express'),     // Call Express
  app         = express(),              // Define the app
  bodyParser  = require('body-parser'), // Pull content from POST reqs
  morgan      = require('morgan'),      // Easily log reqs
  mongoose    = require('mongoose'),    // ODM for Mongo
  config      = require('./config.js'), // Database + Server config file
  path        = require('path');        // To say which file to send

// APP CONFIGURATION ---------------------
// Enable body-parser to enable the ability to pull content from POST reqs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS reqs
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Origin', 'X-Requested-With, content-type, Authorization');

  next();
})

// Connect to Modulus.io DB
// TODO: Set up Gulp to parse any reqs to this address to mongodb://localhost:27017/myDatabase
// mongoose.connect(config.database);
// For local testing:
mongoose.connect('mongodb://localhost:27017/water_challenge');

// Log all reqs to console
app.use(morgan('dev'));

// Set location of public (static files + assets)
app.use(express.static(__dirname + '/public'));


// ROUTES FOR OUR API
// ======================================

// REGISTER OUR ROUTES ------------------
// Prefix all routes with /api
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// CATCH-ALL ROUTE ----------------------
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/app/index.html'))
});

// START THE SERVER
// ======================================
app.listen(config.port);
console.log('Visit me at http://localhost:' + config.port);
