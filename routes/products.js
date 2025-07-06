const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Categorie = require('../models/Categorie');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  const products = await Product.find(query);
  res.json(products);
});

router.post('/', auth, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  console.log(req.body.category);
  const category = new Categorie({name:`${req.body.category}`,image:""});
  category.save();
  res.status(201).json(product);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
