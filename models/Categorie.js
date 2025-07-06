const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  count: Number,
});

module.exports = mongoose.model('Categories', CategorySchema);
