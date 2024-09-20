// definiremos nuestros endpoints que van a apuntar a
// cada funcion, a traves de los protocolos HTTP.

const { Router } = require("express"); //s, para usar los metodos POST, PUT, GET, DELETE,PATCH
const methods = require("../controllers/users.controller");
const { authenticateJWT } = require("../middlewares/jwt");

const router = Router(); //para instanciar la clase Router de express:

// creamos 2 post, 1 para el register, y otro para el login, y un get para devolver un
// usuario por si ID. :id es un path parameter, el cual express se va a encargar de dividir y colocar
// en el req.params (vease el getOne del archivo users.controller.js). En este caso, vamos a
// colocar el middleware, para evitar que cualquier ente que quiera consultar el endpoint, primero
// provea el token, que solo puede ser conseguido mediante una autenticacion correcta a traves
// del login.

router.post("/users/register", methods.register);
router.post("/users/login", methods.login);
router.get("/users/:id", authenticateJWT, methods.getOne);


// exportamos el router
module.exports = router;
