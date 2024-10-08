const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const path = require("path");
require("dotenv").config();


/* Other modules */
const cookieParser = require("cookie-parser"),
    session = require("express-session"),
    FileStore = require("session-file-store")(session),
    passport = require("./passport"),
    flash = require("express-flash"),
    morgan = require("morgan");


/* Routers */
const homeRouter = require("./routers/homeRouter"),
    authRouter = require("./routers/authRouter"),
    reservationRouter = require("./routers/reservationRouter"),
    auctionRouter = require("./routers/auctionRouter"),
    roomRouter = require("./routers/roomRouter");


/* Services */
const { scheduleAuctionCheck } = require("./services/scheduleTasks");


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
app.use(express.static(path.join(__dirname, '../public')));
const storagePath = process.env.STORAGE_PATH;
app.use(`/${storagePath}`, express.static(path.join(__dirname, `../${storagePath}`)));
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
        path: path.join(__dirname, 'sessions'), // 세션 파일이 저장될 디렉토리
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, // 2시간
    },
}));
app.use(flash());


/* Passport */
app.use(passport.initialize());
app.use(passport.session());


/* Initialize local variables */
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});


/* Routing */
app.get('/', (req, res) => { res.render('index') });
app.get('/signup', authRouter);
app.post('/signup', authRouter);
app.get('/signin', authRouter);
app.post('/signin', authRouter);
app.get('/signup/*', authRouter);
app.get('/signin/*', authRouter);
app.get('/reservations', reservationRouter);
app.get('/reservations/*', reservationRouter);
app.post('/reservations/*', reservationRouter);
app.get('/auctions', auctionRouter);
app.get('/auctions/*', auctionRouter);
app.get('/room/*', roomRouter);


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

// 세션 미들웨어 설정
const sessionMiddleware = session({
    store: new FileStore({
        path: path.join(__dirname, 'sessions'), // 세션 파일이 저장될 디렉토리
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000, // 2시간
    },
});
  
// 세션 미들웨어 사용
app.use(sessionMiddleware);
  
// Socket.IO와 세션 미들웨어 통합
io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });

require("./socket")(io);


/* Start services */
const startScheduling = async () => {
    try {
        scheduleAuctionCheck();
        console.log('Reservation tasks are scheduled to be checked and updated every minute');
    } catch (err) {
        console.error('Reservation tasks scheduling error:', err.message);
    }
};

startScheduling();


/* Error middleware */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


/* Start server */
httpServer.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});