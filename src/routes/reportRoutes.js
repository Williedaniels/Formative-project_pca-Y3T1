const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/low-stock', reportController.getLowStockProducts);

module.exports = router;
