const authService = require("./services/authService"),
    auctionService = require("./services/auctionService");

async function isSeller(userId, auctionId) {
    try {
        const auction = await auctionService.getOneAuction(auctionId);
        return userId === auction.seller_id;
    } catch (error) {
        console.error('Error fetching auction:', error);
        return false;
    }
}

module.exports = (io) => {
    io.use(async (socket, next) => {
        const session = socket.request.session;
        
        // Check user information on session
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
            const session = socket.request.session;
            socket.join(roomId);
            socket["username"] = socket.user.username;
            
            // Check if the user is a seller
            const auctionId = session.auctionId;
            const userId = session.passport.user;
            const isSellerFlag = await isSeller(userId, auctionId);
            socket["isSeller"] = isSellerFlag;
            if (isSellerFlag) {
                socket.emit('seller');
            }
            
            socket.to(roomId).emit("welcome", socket.user.username);
            console.log('Socket info: ', socket.id, socket.user.username, socket.rooms, socket.isSeller);
        });

        socket.on('getCurrentBid', (callback) => {
            const price = 100; // 실제로는 동적으로 가져오는 값일 것입니다
            callback(price);
        });
        

        
        // Emoji
        socket.on('click_happy', (roomId) => {
            const msg = "I am happy";
            const username = socket.user.username;
            socket.to(roomId).emit('emoji_happy', msg, username);
        });

        socket.on('click_angry', (roomId) => {
            const msg = "I am angry";
            const username = socket.user.username;
            socket.to(roomId).emit('emoji_angry', msg, username);
        });

        socket.on('click_sad', (roomId) => {
            const msg = "I am sad";
            const username = socket.user.username;
            socket.to(roomId).emit('emoji_sad', msg, username);
        });

        socket.on('click_thinking', (roomId) => {
            const msg = "Hmm...";
            const username = socket.user.username;
            socket.to(roomId).emit('emoji_thinking', msg, username);
        });
    });
}
