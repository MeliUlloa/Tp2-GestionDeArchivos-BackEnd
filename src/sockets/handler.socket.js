/**
 * Maneja los eventos de WebSocket para cada cliente conectado.
 * @param {Socket} socket - El objeto socket que representa la conexión del cliente.
 */

const socketHandler = (socket) =>{
//     creamos un evento personalizado, llamado “message”, que
// va a ser escuchado por esta fx.
    socket.on("message", (data) => {
        console.log("Mensjae recibido", data);
        socket.emit("message", "Su mensaje fue procesado correctamente");
        
    });

    socket.on("disconnect", ()=>{
        console.log("Usuario desconectado");
    });
};

module.exports = { socketHandler };