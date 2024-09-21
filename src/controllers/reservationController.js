const reservationService = require("../services/reservationService");

exports.handleGetReservationsByPage = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; // 기본값은 1
        const limit = parseInt(req.query.limit, 10) || 10; // 페이지당 항목 수, 기본값은 10

        const reservations = await reservationService.getReservationsByPage(page, limit);

        res.send(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error: error.message });
    }
};

exports.handleCreateReservation = async (req, res, next) => {
    function formatDateTime(startTime) {
        const startDateTime = new Date(startTime);

        if (isNaN(startDateTime)) {
            console.error("Invalid date format:", startTime);
            return null;
        }
    
        // 날짜를 'YYYY-MM-DD' 형식으로 변환
        const year = startDateTime.getUTCFullYear();
        const month = String(startDateTime.getUTCMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(startDateTime.getUTCDate()).padStart(2, '0');
    
        // 시간을 'HH:MM:SS' 형식으로 변환
        const hours = String(startDateTime.getUTCHours()).padStart(2, '0');
        const minutes = String(startDateTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(startDateTime.getUTCSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    try {
        const currentUser = req.user;
        const newPhoto = req.file;
        const { title, description, startTime } = req.body;

        // startTime을 적절한 형식으로 변환
        const formattedTime = formatDateTime(startTime);

        // newreservation 객체를 생성할 때 formattedTime을 사용
        const newReservation = { title, description, startTime: formattedTime };

        // 파일과 예약 데이터 생성
        // If there is no file, noimage will be new photo object
        let photoData;
        if (newPhoto) {
            photoData = await reservationService.createPhoto(newPhoto);
        }
        const reservationData = await reservationService.createReservation(currentUser, newReservation, photoData);

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
        const { reservation, reservationDetail } = await reservationService.getOneReservation(reservationId);
        if (!reservation) {
            throw new Error('No reservation data found');
        }

        if (reservation.status === 'ongoing') {
            //res.status(500).json({ message: 'The reservation has already started' });
            res.redirect('/');
            return;
        }
        res.render("reservations/reservationDetail", { reservation, reservationDetail });
    } catch (error) {
        console.error('Error in handleCreateReservation:', error);
        res.status(500).json({ message: 'Error getting reservation', error: error.message });
    }
};