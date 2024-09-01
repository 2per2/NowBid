const upload = require("./multerConfig");

// Middleware for handling file uploads and text fields
exports.checkFileUpload = (req, res, next) => {
    // Handles file upload and updates req.file
    upload.single('photo')(req, res, (err) => {
        if (err) {
            // If there's an error during file upload, pass the error to the error handler
            return next(err);
        }
        // Whether the file was uploaded or not, move to the next middleware
        next();
    });
};