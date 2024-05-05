const express = require('express');
const userController = require('../user/controller');

const router = express.Router();

// Rutas para CRUD de usuarios
router.post('/users', userController.createUser);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updateUserById);
router.delete('/users/:userId', userController.deleteUserById);

module.exports = router;
