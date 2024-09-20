// tiene configuraciones para la conexion a la base
// de datos, como tambien las queries para crear tablas,
// consultas y demas

const mysql = require("mysql2/promise");
const config = require("../../config");

//Generamos la conexión 

const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
});

const getConnection = () => {
    console.log("Conectando a la base de datos");
    return connection; 
};

//obtenemos la conexión y la retornamos
module.exports = { getConnection };

// En este archivo nos vamos a centrar en realizar la configuracion para la conexion con la base
// de datos. Para ello importamos la libreria de mysql/promise. Lo que se encarga de hacer esta
// funcion, es de abrir un pool de conexion para la base de datos, donde le va a dar una query, y
// reciba un resultado, devolviendolo como un objeto, en otras propiedades de como fue la
// consulta, cuanto tardo y demas. Cada pool de conexion es unica, abriendose para obtener los
// datos, y cerrandose despues de obtenerlos.