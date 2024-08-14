const schedule = require("node-schedule");
const reservationService = require("./reservationService");

const checkAndStartAuctions = async () => {
    try {
        await reservationService.updateReservationStatus();
    } catch (error) {
        console.error(`Error while updating reservations: ${error.message}`);
    }
};

exports.scheduleAuctionCheck = () => {
    // 매 분마다 checkAndStartAuctions 함수를 실행
    schedule.scheduleJob('*/1 * * * *', () => {
        console.log('Checking and updating reservations at', new Date());
        checkAndStartAuctions();
    });
};