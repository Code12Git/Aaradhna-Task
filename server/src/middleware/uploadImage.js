const multer = require('multer');
const fs = require('fs');
const path = require('path');

const parentDir = path.resolve(__dirname, '..');
const uploadDir = path.join(parentDir, 'public/temp');

console.log(parentDir,uploadDir)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
console.log("hey")
const upload = multer({ storage });

module.exports =  upload ;
