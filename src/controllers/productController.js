const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// Complete controller functions
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('categories');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('categories');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = (req, res) => {
    // Your logic to create a product
    res.status(201).send({ message: 'Product created successfully' });
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add variant functions
exports.addVariant = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    product.variants.push(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateVariant = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const variant = product.variants.id(req.params.variantId);
    if (!variant) return res.status(404).json({ error: 'Variant not found' });

    variant.set(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteVariant = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.variants.pull(req.params.variantId);
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};