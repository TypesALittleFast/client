const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("public/videos")) {
        fs.mkdirSync("public/videos");
      }
  
      cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });






  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
  
      if (ext !== ".pdf") {
        return cb(new Error("Only pdf files are allowed!"));
      }
  
      cb(null, true);
    },
  });
  


module.exports=upload;