let io;
module.exports = {

    useSocket: null,
    init: (httpServer) => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error("Socket.io is not initialized");

        }

        return io;
    }

}
