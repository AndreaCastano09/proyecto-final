const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); // Ajusta según tu estructura

// Define tus rutas aquí
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
// Agrega más rutas según sea necesario

module.exports = router;
