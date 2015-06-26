// Access Modulus' Mongo console:
// mongo apollo.modulusmongo.net:27017/ewU8mapu -u <user> -p <pass>
module.exports = {
  'port': process.env.PORT || 8080,
  'database': 'mongodb://rgpass:twolitersaday@apollo.modulusmongo.net:27017/ewU8mapu',
  'secret': 'twolitersaday'
};
