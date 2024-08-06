const authService = require("./services/authService");
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Someone connected to server");

        // Create or enter the room
        socket.on("enter_room", async (roomId, done) => {
            const req = socket.request.session;
            const user = await authService.findUserByPk(req.passport.user);

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
