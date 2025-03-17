const { body } = require('express-validator');

exports.validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('categories').optional().isArray(),
  body('variants').optional().isArray(),
  body('variants.*.sku').notEmpty().withMessage('Variant SKU is required'),
  body('variants.*.inventory').isInt({ min: 0 }).withMessage('Inventory must be a non-negative integer')
];