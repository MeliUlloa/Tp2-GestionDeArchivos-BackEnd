const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const fileToUpload = require("express-fileupload"); // Para manejar la subida de archivos

//Routes
const usersRoutes = require('./src/routes/users.routes'); // Rutas de usuarios
const pagosRoutes = require('./src/routes/pagos.routes'); // Rutas de pagos

//* Express
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// *Cors
app.use(cors());

// Middlewares
app.use(morgan("dev"));


// Rutas
app.use('/users', usersRoutes);
app.use('/pagos', pagosRoutes);

// Puerto en el cual se ejecutará la aplicación
app.set("port", 3000)

module.exports = app;

// En este archivo, vamos a configurar nuestro proyecto, express practicamente es el
// nueclo del mismo, por lo que necesita ser configurado. Con app (instancia importada de
// express) vamos a poder ingresar a todos los metodos necesarios para la configuracion,
// entre ellos app.use(), donde le damos las heramientas para poder establecer
// configuraciones, como el uso de cors, morgan, json (transforma todas las peticiones en
// un formato JSON), las rutas (endpoints) de nuestra aplicacion. Y por ultimo lo
// exportamos para sea visible en el resto del proyecto.
