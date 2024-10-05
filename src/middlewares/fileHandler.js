const multer = require("multer");
const fs = require("fs");

const fileHandler = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype.includes("image")) {
        if (!fs.existsSync(`${__dirname}/../../public/images`)) {
          fs.mkdirSync(`${__dirname}/../../public/images`, { recursive: true });
        }
        cb(null, `${__dirname}/../../public/images`);
      } else if (file.mimetype.includes("pdf")) {
        if (!fs.existsSync(`${__dirname}/../../public/docs`)) {
          fs.mkdirSync(`${__dirname}/../../public/docs`, { recursive: true });
        }
        cb(null, `${__dirname}/../../public/docs`);
      } else {
        if (!fs.existsSync(`${__dirname}/../../public/others`)) {
          fs.mkdirSync(`${__dirname}/../../public/others`, { recursive: true });
        }
        cb(null, `${__dirname}/../../public/others`);
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (
      file.mimetype.includes("kml") ||
      file.mimetype.includes("xml") ||
      file.mimetype.includes("image") ||
      file.mimetype.includes("msword") ||
      file.mimetype.includes("pdf") ||
      file.mimetype.includes(
        "vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) ||
      file.mimetype.includes("vnd.ms-excel") ||
      file.mimetype.includes(
        "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      cb(null, true);
    } else {
      cb(new Error("File harus berupa gambar / dokumen!"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const deleteFile = (filePath) => {
  if (!fs.existsSync(filePath)) return "File not found, no file deleted!";
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
      return `Internal Error when deleting file: ${err}`;
    } else {
      console.log("File deleted");
      return "Image File deleted succesfully";
    }
  });
};

module.exports = { fileHandler, deleteFile };
