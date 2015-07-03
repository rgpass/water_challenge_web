// Grab packages
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

// Set up Schema
var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true, select: false } // When querying, do not return password
});

// Hash pw prior to saving
UserSchema.pre('save', function preSave(next) {
  var user = this;

  // Hash pw only if it's been changed or new user
  if (!user.isModified('password')) return next();

  // Generate hash
  bcrypt.hash(user.password, null, null, function hashPw(err, hash) {
    if (err) { return next(err); }

    user.password = hash;

    next();
  });
});

// Compare pw with user's hashed pw
UserSchema.methods.comparePassword = function comparePassword(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

// Return model
module.exports = mongoose.model('User', UserSchema);
