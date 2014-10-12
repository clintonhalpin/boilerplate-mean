var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  created_at : { type: Date },
  updated_at : { type: Date }
});

ItemSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Item', ItemSchema);

