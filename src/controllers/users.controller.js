const { getConnection } = require("../database/database");
const { request, response } = require("express");

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {object} req - Solicitud HTTP, debe contener nombre_usuario, contrasena, y rol.
 * @param {object} res - Respuesta HTTP.
 * @returns {json} Respuesta con el estado de la creación del usuario.
 */

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre_usuario, contrasena, rol } = req.body;

  if (!nombre_usuario || !contrasena || !rol) {
    return res.status(400).json({ mensaje: "Datos faltantes" });
  }

  try {
    const connection = await getConnection();
    await connection.query(
      'INSERT INTO usuarios (nombre_usuario, contrasena, rol) VALUES (?, ?, ?)',
      [nombre_usuario, contrasena, rol]
    );
    res.status(201).json({ mensaje: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el usuario" });
  }
};

/**
 * Obtiene todos los usuarios registrados en la base de datos.
 * 
 * @param {object} req - Solicitud HTTP.
 * @param {object} res - Respuesta HTTP.
 * @returns {json} Respuesta con los usuarios registrados.
 */

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los usuarios" });
  }
};

module.exports = { crearUsuario, obtenerUsuarios };
