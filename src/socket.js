module.exports = (io) => { 
    io.on("connection", (socket) => {
	    console.log("Someone connected to server");

        // Create or enter the room
        socket.on("enter_room", (roomId, done) => {
            socket.join(roomId);
            socket["name"] = "anonymous";
            done();
            socket.to(roomId).emit("welcome", socket.name);
        });

    });
}