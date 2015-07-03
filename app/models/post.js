var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Set up Schema
var PostSchema = new Schema({
  volume: { type: Number, required: true },
  user: { type: Object, required: true },
  date: { type: Number, required: true }
});

module.exports = mongoose.model('Post', PostSchema);
