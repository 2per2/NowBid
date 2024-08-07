const authService = require("./services/authService");

module.exports = (io) => {
    io.use((socket, next) => {
        const req = socket.request;
        if (req.session.passport.user) {
            // 로그인된 사용자 정보가 있으면
            socket.user = req.session.passport.user;
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    });

    io.on("connection", (socket) => {
        console.log("Someone connected to server");

        // Create or enter the room
        socket.on("enter_room", async (roomId, done) => {
            socket.join(roomId);
            socket["username"] = user.username;
            socket.to(roomId).emit("welcome", socket.username);
            console.log(socket.id, socket.username, socket.rooms);
        });

        socket.on('click_chat', (roomId, now) => {
            socket.to(roomId).emit('chat', now);
        });
    });
}
