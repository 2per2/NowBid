module.exports = (io) => { 
    io.on("connection", (socket) => {
	    console.log("Someone connected to server");
    });
}