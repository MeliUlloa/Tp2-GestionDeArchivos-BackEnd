const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const fileToUpload = require("express-fileupload");
const usersRoutes = require('./src/routes/users.routes');
const pagosRoutes = require('./src/routes/pagos.routes');

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


// const files = require("./routes/upload-file-routes");


app.set("port", 3000)

module.exports = app
// En este archivo, vamos a configurar nuestro proyecto, express practicamente es el
// nueclo del mismo, por lo que necesita ser configurado. Con app (instancia importada de
// express) vamos a poder ingresar a todos los metodos necesarios para la configuracion,
// entre ellos app.use(), donde le damos las heramientas para poder establecer
// configuraciones, como el uso de cors, morgan, json (transforma todas las peticiones en
// un formato JSON), las rutas (endpoints) de nuestra aplicacion. Y por ultimo lo
// exportamos para sea visible en el resto del proyecto.

// Configuración del puerto
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });