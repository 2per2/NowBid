const multer = require('multer');
const path = require('path');

// Multer의 저장소 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 파일이 저장될 디렉토리
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
    }
});

// Multer 인스턴스 생성
const upload = multer({ storage: storage });

module.exports = upload;
