const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    const match = [
    "image/png", 
    "image/jpeg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword"   
  ];
    if (match.indexOf(file.mimetype) === -1) {      
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return cb(message, null);
    }
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file")  //.array("multi-files",10);
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

