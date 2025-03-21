const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes for products
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.patchProduct); // Add this line
router.delete('/:id', productController.deleteProduct);

// Define routes for variants
router.post('/:productId/variants', productController.addVariant);
router.put('/:productId/variants/:variantId', productController.updateVariant);
router.delete('/:productId/variants/:variantId', productController.deleteVariant);

module.exports = router;
