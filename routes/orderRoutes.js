// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Rutas para la sección del cliente
router.get('/shopping-cart', orderController.getShoppingCart); // Obtener el carrito de compras
router.post('/shopping-cart', orderController.createOrder); // Crear una nueva orden

// Rutas para la sección del administrador (protegidas por autenticación)
router.get('/admin/orders', isAuthenticated, orderController.getAllOrders); // Obtener todas las órdenes
router.get('/admin/orders/:id', isAuthenticated, orderController.getOrderById); // Obtener una orden por ID
router.put('/admin/orders/:id', isAuthenticated, orderController.updateOrder); // Actualizar una orden
router.delete('/admin/orders/:id', isAuthenticated, orderController.deleteOrder); // Eliminar una orden

module.exports = router;
