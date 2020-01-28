const { File } = require("../models");

module.exports = {
  async store(req, res) {
    const { originalname: name, filename } = req.file;
    const file = await File.create({ name, filename });
    return res.send(file);
  }
};
