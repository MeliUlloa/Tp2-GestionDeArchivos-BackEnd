const express = require('express');
const { crearUsuario, obtenerUsuarios } = require('../controllers/users.controller');
const router = express.Router();

/**
 * @route POST /nuevo-usuario
 * @description Crear un nuevo usuario en el sistema.
 * @access Public
 * @param {string} nombre_usuario - Nombre de usuario único.
 * @param {string} contrasena - Contraseña del usuario.
 * @param {string} rol - Rol del usuario (ej: administrador, usuario).
 */

// Ruta para crear un nuevo usuario
router.post('/nuevo-usuario', crearUsuario);

/**
 * @route GET /listar-usuarios
 * @description Obtener la lista de todos los usuarios registrados en el sistema.
 * @access Public
 */

// Ruta para obtener todos los usuarios
router.get('/listar-usuarios', obtenerUsuarios);

module.exports = router;


