var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  dateCreated: String 
});

module.exports = mongoose.model('Item', ItemSchema);

