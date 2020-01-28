const multer = require("multer");
const crypto = require("crypto");
const { extname, resolve } = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename(req, file, cb) {
      crypto.randomBytes(16, (_, buffer) => {
        return cb(null, buffer.toString("hex") + extname(file.originalname));
      });
    }
  })
};
