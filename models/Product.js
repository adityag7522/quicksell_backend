const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  image: String,
  category: String
});

module.exports = mongoose.model('Product', productSchema);
