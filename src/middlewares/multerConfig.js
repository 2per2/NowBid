const multer = require('multer');
const path = require('path');
const fs = require('fs');
require("dotenv").config();

const makeDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // ensure the directory is created recursively
    }
    return dir;
}

// Multer의 저장소 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userDir = path.join(process.env.STORAGE_PATH, String(req.user.id)); // convert req.user.id to string and combine with STORAGE_PATH
        makeDir(userDir); // create the user-specific directory
        cb(null, userDir); // set the user-specific directory as the destination
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // set the file name
    }
});

// Multer 인스턴스 생성
const upload = multer({ storage: storage });

module.exports = upload;
