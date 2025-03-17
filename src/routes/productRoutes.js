const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct); // POST handler

router.route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct) // PUT handler
  .delete(productController.deleteProduct); // DELETE handler

// Variant routes
router.post('/:productId/variants', productController.addVariant);
router.put('/:productId/variants/:variantId', productController.updateVariant);
router.delete('/:productId/variants/:variantId', productController.deleteVariant);

module.exports = router;