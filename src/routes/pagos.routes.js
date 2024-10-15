const express = require('express');
const { registrarPago, obtenerPagosUsuario, upload, uploadRecibo} = require('../controllers/pagos.controller');

const router = express.Router();

/**
 * @route POST /nuevo-pago
 * @description Registrar un nuevo pago en el sistema.
 * @access Public
 * @param {number} id_usuario - ID del usuario que realiza el pago.
 * @param {number} monto - Monto del pago realizado.
 * @param {string} ruta_recibo - (Opcional) Ruta del recibo del pago.
 */

// Ruta para registrar un nuevo pago
router.post('/nuevo-pago', registrarPago);

/**
 * @route GET /usuario/:id_usuario
 * @description Obtener todos los pagos de un usuario específico.
 * @access Public
 * @param {number} id_usuario - ID del usuario cuyos pagos se desean obtener.
 */

// Ruta para obtener los pagos de un usuario específico
router.get('/usuario/:id_usuario', obtenerPagosUsuario);

/**
 * @route POST /subir-recibo/:id
 * @description Subir un archivo PDF como recibo y asociarlo a un pago específico.
 * @access Public
 * @param {file} recibo - Archivo PDF que se subirá.
 * @param {number} id_pago - ID del pago al cual se asociará el recibo.
 */

// Ruta para subir un recibo en PDF
router.post('/subir-recibo/:id', upload.single('recibo'), uploadRecibo);

module.exports = router;


