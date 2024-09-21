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
                const foundUser = await authService.getUserByPk(userId);
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
        socket.currentRoom = null;

        // Create or enter the room
        socket.on("enter_room", async (roomId, callback) => {
            socket.join(roomId);
            socket.currentRoom = roomId;
            
            // Check if the user is a seller
            const session = socket.request.session;
            const auctionId = session.auctionId;
            const userId = socket.user.id;
            const isSellerFlag = await isSeller(userId, auctionId);
            socket["isSeller"] = isSellerFlag;
            if (isSellerFlag) {
                socket.emit('seller');
            }
            socket["auctionId"] = auctionId;

            // Get auction
            const auction = await auctionService.getOnlyAuction(auctionId);
            const bid = auction.winning_bid;

            socket.to(socket.currentRoom).emit("welcome", socket.user.username);
            console.log('Socket info: ', socket.id, socket.user.username, socket.rooms, socket.isSeller);
            callback(socket.currentRoom, bid);
        });

        socket.on('updateBid', async (bidValue, callback) => {
            const roomId = socket.currentRoom;
            const auctionId = socket.auctionId;
            const userId = socket.user.id;

            const updatedAuction = await auctionService.updateBid(auctionId, userId, bidValue);
            
            const msg = `Current Bid Was Updated To ${bidValue}`;
            io.in(roomId).emit('attention', msg, bidValue);
            //callback(roomData[roomId].currentBid);
        });

        socket.on('click_end', (roomId) => {
            console.log(`${bidderId} is bidder and the final bid is ${currentBid} in ${roomId}`);
        });
        
        // Emoji
        socket.on('click_happy', (roomId) => {
            const msg = "I am happy";
            const username = socket.user.username;
            socket.to(roomId).emit('emoji_happy', msg, username);
            console.log('clicked');
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
