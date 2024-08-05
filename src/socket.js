module.exports = (io) => { 
    io.on("connection", (socket) => {
	    console.log("Someone connected to server");

        // Create or enter the room
        socket.on("enter_room", (roomId, done) => {
            socket.join(roomId);
            socket["name"] = "anonymous";
            socket.to(roomId).emit("welcome");
            done();
            console.log(socket.id, socket.rooms);
        });

        socket.on('click_chat', (roomId, now) => {
            socket.to(roomId).emit('chat', now);
        });
    });
}