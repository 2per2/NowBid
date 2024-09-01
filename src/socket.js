const authService = require("./services/authService");

module.exports = (io) => {
    io.use(async (socket, next) => {
        const req = socket.request;
        const session = req.session;
        
        if (session.passport) {
            try {
                const userId = session.passport.user;
                const foundUser = await authService.findUserByPk(userId);
                if (foundUser) {
                    socket.user = foundUser; // 사용자 정보를 소켓에 저장
                    next(); // 미들웨어를 통과
                } else {
                    next(new Error('User not found'));
                }
            } catch (error) {
                console.error('Error finding user:', error);
                next(new Error('Internal server error')); // 서버 오류 처리
            }
        } else {
            next(new Error('Unauthorized')); // 로그인되지 않은 경우
        }
    });    

    io.on("connection", (socket) => {
        console.log("Someone connected to server");

        // Create or enter the room
        socket.on("enter_room", async (roomId, done) => {
            socket.join(roomId);
            socket["username"] = socket.user.username;
            socket.to(roomId).emit("welcome", socket.username);
            console.log('Socket info: ', socket.id, socket.username, socket.rooms);
        });

        socket.on('click_chat', (roomId, now) => {
            socket.to(roomId).emit('chat', now);
        });
    });
}
