const app = require("./app");
const envs = require("./config");
const os = require('os');


// implementamos Soket.io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const socketHandler = require("./src/sockets/handler.socket");

const main = () => {
    server.listen(app.get("port"), () => {
        console.log(`Server running on port ${3000}`);
    });

    io.on("connection", (socket) => {
        console.log("Usuario conectado");
        // socketHandler.socketHandler(socket);
    });

};
console.log('uptime', os.uptime() / 60 / 60);

main();

// Y por ultimo, el archivo index.js, que va a recibir como importacion las configuraciones
// de app creado anteriormente, creamos una funcion main (en otros framewors le llaman
// bootstrap), y la ejecutamos. Todo el hilo de exportaciones termina aca, siendo este
// archivo el responsable de ejecutar la app.