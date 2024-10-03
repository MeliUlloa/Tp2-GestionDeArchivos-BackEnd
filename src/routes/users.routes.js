const express = require('express');
const { crearUsuario, obtenerUsuarios } = require('../controllers/users.controller');
const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/nuevo-usuario', crearUsuario);

// Ruta para obtener todos los usuarios
router.get('/listar-usuarios', obtenerUsuarios);

module.exports = router;


