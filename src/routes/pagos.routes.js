const express = require('express');
const { registrarPago, obtenerPagosUsuario, upload, uploadRecibo} = require('../controllers/pagos.controller');

const router = express.Router();

// Ruta para registrar un nuevo pago
router.post('/nuevo-pago', registrarPago);

// Ruta para obtener los pagos de un usuario específico
router.get('/usuario/:id_usuario', obtenerPagosUsuario);

// Ruta para subir un recibo en PDF
router.post('/subir-recibo/:id', upload.single('recibo'), uploadRecibo);

module.exports = router;


