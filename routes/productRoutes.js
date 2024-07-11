const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/shopping-cart', productController.getShoppingCart);
router.post('/shopping-cart', productController.addToCart);

module.exports = router;
