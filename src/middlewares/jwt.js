// Impotaciones necesarias 
const jwt = require ("jsonwebtoken");
const config = require ("../../config");
const { response, request, next } = require ("express");

// funcion middleware que actúan como interceptores de las peticiones
//(requests) en una aplicación. Su función principal es procesar, modificar o verificar la
//información de las peticiones antes de que lleguen a su destino final o antes de enviar una
//respuesta. Los middlewares pueden realizar diversas tareas, como autenticar usuarios, validar
//datos, registrar actividades, o incluso modificar las peticiones y respuestas.

const authenticateJWT = (req = request, res = response, next = next) => {
    // authorization: contiene el token
    const authHeader = req.headers["authorization"];
    /*
        Hacemos un split para dividir el token del segundo index obtenido
        desde el array, el cual contiene el dato
    */
    const token = authHeader && authHeader.split(" ")[1];
// Si no se reconoce un token, devolverá error 401
    if(token == null) return res.sendStatus(401); // Si no hay token, devolver error 401

    jwt.verify(token, config.secretKey, (err, user)=>{
        if(err) return res.sendStatus(403);// Si hay error en la verificacion, devolver error 402
        req.user = user; // Guardar el usuario en el request para usar en rutas protegidas 
        next(); // Pasar al siguiente middleware o ruta
    });
};
// Segunda funcion, si bien no es un middleware, la colocamos en este archivo para
//utilizar la importacion de jwt:

const generateJwt = async (user) => {
    const payload = { // Generamos payload con la info del usuario
        sub: user.id,
        username: user.username,
        name: user.nombre,
    };

const options = { //* Le damos una validez al token de 24 horas
    expiresIn: "24h",
};

// Retornamos el Token
return jwt.sign(payload, config.secretKey, options);
};

module.exports = { authenticateJWT, generateJwt};