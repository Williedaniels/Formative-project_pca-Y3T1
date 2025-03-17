const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/products', searchController.searchProducts);

module.exports = router;