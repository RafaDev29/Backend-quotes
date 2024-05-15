const express = require('express');
const router = express.Router();
const userController = require('./controller');

// Rutas CRUD para vendedores
router.post('/create', userController.createVendor); // Corrección aquí
router.get('/list', userController.getAllVendor);
router.get('/:id', userController.getVendorById);
router.put('/update/:id', userController.updateVendor);
router.delete('/delete/:id', userController.deleteVendor);

module.exports = router;
