const multer = require('multer'); // Para el manejo de multipart/form-data 
const path = require('path');

const { getConnection } = require("../database/database");

/**
 * Registra un nuevo pago en la base de datos.
 * 
 * @param {object} req - Solicitud HTTP, debe contener id_usuario y monto.
 * @param {object} res - Respuesta HTTP.
 * @returns {json} Respuesta con el estado del registro.
 */

// Registrar un nuevo pago
const registrarPago = async (req, res) => {
  const { id_usuario, monto, ruta_recibo } = req.body;

  if (!id_usuario || !monto) {
    return res.status(400).json({ mensaje: "Datos faltantes" });
  }

  try {
    const connection = await getConnection();
    await connection.query(
      'INSERT INTO pagos (id_usuario, monto, ruta_recibo) VALUES (?, ?, ?)',
      [id_usuario, monto, ruta_recibo]
    );
    res.status(201).json({ mensaje: "Pago registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el pago" });
  }
};


/**
 * Obtiene todos los pagos de un usuario específico.
 * 
 * @param {object} req - Solicitud HTTP, debe contener el id_usuario en los params.
 * @param {object} res - Respuesta HTTP.
 * @returns {json} Respuesta con los pagos del usuario.
 */

// Obtener pagos de un usuario
const obtenerPagosUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM pagos WHERE id_usuario = ?', [id_usuario]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los pagos' });
  }
};


// Configuración de multer para almacenar archivos PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

/**
 * Filtro para aceptar solo archivos PDF.
 * 
 * @param {object} req - Solicitud HTTP.
 * @param {object} file - Archivo que se sube.
 * @param {function} cb - Callback para indicar si el archivo es válido.
 */

// aceptar archivos PDF
const fileFilter = (req, file, cb) => {
  if (file) {
    const fileType = /pdf/;
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());
    if (extName) {
      return cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false)
  }

};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  //limits: { fileSize: 1000000 } // Tamaño máximo 1MB
});

/**
 * Sube un archivo PDF y lo asocia a un pago existente.
 * 
 * @param {object} req - Solicitud HTTP, debe contener id_pago y un archivo PDF.
 * @param {object} res - Respuesta HTTP.
 * @returns {json} Respuesta con el estado de la subida del archivo.
 */

// Subir un recibo en formato PDF y asociarlo con un pago
const uploadRecibo = async (req, res) => {
  console.log(req)
  const { id_pago } = req.body; // El ID del pago que va a recibir el archivo PDF
  if (!req.file) {
    return res.status(400).json({ mensaje: "Por favor sube un archivo PDF" });
  }

  if (!id_pago) {
    return res.status(400).json({ mensaje: "El ID del pago es requerido" });
  }

  try {
    const connection = await getConnection();
    const reciboPath = req.file.path; // Ruta del archivo subido

    // Verificar si el pago existe
    const [payment] = await connection.query('SELECT * FROM pagos WHERE id = ?', [id_pago]);

    if (payment.length === 0) {
      return res.status(404).json({ mensaje: "El pago no existe" });
    }

    // Actualizar la ruta del recibo en la base de datos
    await connection.query(
      'UPDATE pagos SET ruta_recibo = ? WHERE id = ?',
      [reciboPath, id_pago]
    );

    res.status(200).json({ mensaje: "Archivo subido y asociado al pago exitosamente", ruta: reciboPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al subir el archivo y actualizar el pago" });
  }
};


module.exports = { registrarPago, obtenerPagosUsuario, uploadRecibo, upload };
