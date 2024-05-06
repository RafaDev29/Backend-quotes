const express = require('express');
const router = express.Router();
const userController = require('./controller');

// Rutas CRUD para usuarios
router.post('/create', userController.createUser); // Corrección aquí
router.get('/list', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
