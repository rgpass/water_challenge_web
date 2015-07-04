// Access Modulus' Mongo console:
// mongo apollo.modulusmongo.net:27017/ewU8mapu -u <user> -p <pass>
module.exports = {
  // Comes from .env file -- Foreman creates its own, though (5000)
  'port': process.env.PORT || 8080,
  // Not used anymore, set for dev in .env and for production on Heroku
  'database': 'mongodb://rgpass:twolitersaday@apollo.modulusmongo.net:27017/ewU8mapu', 
  'secret': 'twolitersaday'
};
