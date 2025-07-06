const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (_req,res) => {
  const products = await Product.find();
  const categories = [...new Set(products.map(product => product.category))];
  res.json(categories);
});

module.exports = router;
