// app.js es el encargado de configurar el proyecto
const express = require("express"); //: trae con sigo todos los protocolos de HTTP, como las request, response, next, para gestionar todas las consultas a nuestro servidor.
const morgan = require("morgan");
// Importamos libreria 
const fileUpload = require("express-fileupload");
var cors = require("cors");

//*Routes
const users = require("./src/routes/users.routes");
const files = require("./src/routes/upload-file.routes");

//* Express
const app = express();

//* Cors
app.use(cors());

//* Settings
app.set("port", 3000); //! The port
app.use(express.urlencoded({ extended: false })); //! Parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.json()); //! Return the petition as an object json

//* MiddleWares
app.use(morgan("dev"));

//Configuramos para consumo de la API
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true,
  })
);

// Direccion d elas rutas
// Definir rutas con sus URLs base
app.use("/users", users); // Rutas para usuarios
app.use("/files", files); // Rutas para archivos

module.exports = app;

// En este archivo, vamos a configurar nuestro proyecto, express practicamente es el
// nueclo del mismo, por lo que necesita ser configurado. Con app (instancia importada de
// express) vamos a poder ingresar a todos los metodos necesarios para la configuracion,
// entre ellos app.use(), donde le damos las heramientas para poder establecer
// configuraciones, como el uso de cors, morgan, json (transforma todas las peticiones en
// un formato JSON), las rutas (endpoints) de nuestra aplicacion. Y por ultimo lo
// exportamos para sea visible en el resto del proyecto.