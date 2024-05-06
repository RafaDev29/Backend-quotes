const express = require('express');
const router = express.Router();
const userController = require('./controller');

// Rutas CRUD para usuarios
router.post('/users', userController.createUser); // Corrección aquí
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
