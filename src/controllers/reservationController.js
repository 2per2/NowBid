const auctionService = require("../services/auctionService");

exports.handleGetAllReservations = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; // 기본값은 1
        const limit = parseInt(req.query.limit, 10) || 10; // 페이지당 항목 수, 기본값은 10

        const reservations = await auctionService.getReservations(page, limit);

        res.send(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error: error.message });
    }
};

exports.handleCreateReservation = async (req, res, next) => {
    function formatTime(startTime) { // 시간만 추출하여 'HH:MM:SS' 형식으로 변환하는 함수
        const startDateTime = new Date(startTime);

        // 시간을 'HH:MM:SS' 형식으로 변환
        const hours = String(startDateTime.getUTCHours()).padStart(2, '0');
        const minutes = String(startDateTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(startDateTime.getUTCSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    try {
        const currentUser = req.user;
        const newPhoto = req.file;
        const { title, description, startTime } = req.body;

        // startTime을 적절한 형식으로 변환
        const formattedTime = formatTime(startTime);

        // newreservation 객체를 생성할 때 formattedTime을 사용
        const newReservation = { title, description, startTime: formattedTime };

        // 파일과 예약 데이터 생성
        const photoData = await auctionService.createPhoto(newPhoto);
        const reservationData = await auctionService.createReservation(currentUser, newReservation, photoData);

        // 성공적인 응답 코드와 데이터 반환
        res.status(201).json({ success: 'success', reservationData });
    } catch (error) {
        console.error('Error in handleCreatereservation:', error);
        res.status(500).json({ message: 'Error creating reservation', error: error.message });
    }
};

exports.handleGetOneReservation = async (req, res, next) => {
    try {
        const reservationId = req.params.id;
        const reservationData = await auctionService.getOneReservation(reservationId);
        if (!reservationData) {
            throw new Error('No reservation data found');
        }

        //res.status(201).json({ success: 'success', reservationData });
        res.render("reservations/reservationDetail", { data: reservationData });
    } catch (error) {
        console.error('Error in handleCreatereservation:', error);
        res.status(500).json({ message: 'Error getting reservation', error: error.message });
    }
};