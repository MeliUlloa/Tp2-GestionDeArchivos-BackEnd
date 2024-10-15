const app = require("./app");
const envs = require("./config");
const os = require('os');

// servidor con HTTP.
const http = require("http");
const server = http.createServer(app);

// implementamos Soket.io
const { Server } = require("socket.io");
const io = new Server(server);

// Llamada a la fx del socket
const socketHandler = require("./src/sockets/handler.socket");

//const socketHandler = require("./sockets/recibos.socket");


const main = () => {
    server.listen(app.get("port"), () => {
        console.log(`Server running on port ${app.get("port")}`);

    });

    io.on("connection", (socket) => {
        console.log("Usuario conectado");
         socketHandler.socketHandler(socket);
    });

};
console.log('uptime', os.uptime() / 60 / 60);

main();

// Y por ultimo, el archivo index.js, que va a recibir como importacion las configuraciones
// de app creado anteriormente, creamos una funcion main (en otros framewors le llaman
// bootstrap), y la ejecutamos. Todo el hilo de exportaciones termina aca, siendo este
// archivo el responsable de ejecutar la app.