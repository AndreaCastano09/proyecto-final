const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/categories', isAuthenticated, adminController.getCategories);
router.post('/categories', isAuthenticated, adminController.createCategory);
router.put('/categories/:id', isAuthenticated, adminController.updateCategory);
router.delete('/categories/:id', isAuthenticated, adminController.deleteCategory);

router.get('/products', isAuthenticated, adminController.getProducts);
router.post('/products', isAuthenticated, adminController.createProduct);
router.put('/products/:id', isAuthenticated, adminController.updateProduct);
router.delete('/products/:id', isAuthenticated, adminController.deleteProduct);

router.get('/orders', isAuthenticated, adminController.getOrders);

router.get('/users', isAuthenticated, adminController.getUsers);
router.post('/users', isAuthenticated, adminController.createUser);
router.put('/users/:id', isAuthenticated, adminController.updateUser);
router.delete('/users/:id', isAuthenticated, adminController.deleteUser);

module.exports = router;
