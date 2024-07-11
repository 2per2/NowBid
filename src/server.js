const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
require("dotenv").config();


/* Other modules */
const cookieParser = require("cookie-parser"),
    session = require("express-session"),
    FileStore = require("session-file-store")(session),
    passport = require("./passport"),
    morgan = require("morgan");


/* Routers */
const homeRouter = require("./router/homeRouter");


/* Initialize sequelize */
const db = require('./models');

db.sequelize.sync().then(() => {
	console.log('Database synchronized successfully');
}).catch(error => {
	console.log('Database synchronized failed', error);
});


/* Setting app */
app.set("view engine", "ejs");
app.use(layouts);
app.set("views", __dirname + "/views");
const PORT = process.env.PORT || 3000;
app.use("/public", express.static(__dirname + "/public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser(process.env.SESSION_SECRET));


/* Session */
app.use(session({
    store: new FileStore({
      path: './sessions', // 세션 파일이 저장될 디렉토리
      secret: process.env.SESSION_SECRET, // 비밀키는 환경변수로 관리하는 것이 좋습니다.
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 60 * 60 * 1000, // 2시간
      },
    }),
    secret: process.env.SESSION_SECRET, // 비밀키는 환경변수로 관리하는 것이 좋습니다.
    resave: false,
    saveUninitialized: false,
  }));


/* Passport */
app.use(passport.initialize());
app.use(passport.session());


/* Routing */
app.get('/', (req, res) => { res.render('index') });
app.get('/signup', (req, res) => { res.render('auth/signup') });


/* Setting http server and socket.io */
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    // you can admin-ui by visiting admin.socket.io/admin
    cors: { 
        origin: ["https://admin.socket.io"],
        credentials: true,
        },
    }
);
instrument(io, {
    auth: false,
    }
);

require("./socket")(io);


/* Start server */
httpServer.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});