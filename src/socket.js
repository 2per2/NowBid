module.exports = (io) => { 
    io.on("connection", (socket) => {
	    console.log("Someone connected to server");

        // Create or enter the room
        socket.on("enter_room", (roomName, done) => {
            socket.join(roomName);
            socket["name"] = "anonymous";
            done();
            socket.to(roomName).emit("welcome", socket.name);
        });
    });
}