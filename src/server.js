const http = require("http");
const { Server } = require("socket.io");
//const { instrument } = require("@socket.io/admin-ui");
const express = require("express");
const app = express();


/* Setting app */
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("port", process.env.PORT || 3000);
app.use("/public", express.static(__dirname + "/public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
//app.get('/', (req, res) => { res.render('home') });


/* Setting http server and socket.io */
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
	console.log("someone connected!");
});


/* Start server */
httpServer.listen(port, () => {
	console.log("start server");
});
