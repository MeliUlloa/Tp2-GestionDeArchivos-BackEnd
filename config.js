// config.js tiene todas las configuraciones para crear instancias
const { config } = require("dotenv")

config();

module.exports = {
    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_database,
    user: process.env.db_user,
    password: process.env.db_password,
    secretKey: process.env.secret_seed,
  };

//   Aqui, primeramente traemos todos los metodos que estan en la libreria dotenv, a traves
// del require (importacion). Anteriormente dijimos que esta se encarga de gestionar el
// archivo .env, por lo que aqui, traemos esas variables para realizar la instancia a la base
// de datos y la firma para nuestro token. Esta misma lo vamos a exportar para que pueda
// ser consumido por todo el proyecto.