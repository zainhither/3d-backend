const multer = require("multer");
const path = require("path");

// Storage for window

const windowStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads/windows'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}); 

const windowUpload = multer({
	storage: windowStorage
});


module.exports.windowUpload = windowUpload;

