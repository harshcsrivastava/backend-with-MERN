import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //CB : CALLBACK, DESTINATION jaha rkhni hai
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    //ye tiny amount hai lekin originalName nhi rkhte nhi to overwrite hojayega isiliye kuch combo karte
    // see multer docs
  },
});

export const upload = multer({ storage });
