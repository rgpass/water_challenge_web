console.log('Running!');

// Get HTTP and Filesystem modules
var http = require('http'),
  fs = require('fs');

// Create server via HTTP module
http.createServer(function(req, res) {
  // Write to our server, set config for the response
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });

  // Grab index.html file via fs
  var readStream = fs.createReadStream(__dirname + '/public/app/index.html');

  // Send index.html to our user
  readStream.pipe(res);
}).listen(1337);

// Tell ourselves what's happening
console.log('Visit me at http://localhost:1337');
