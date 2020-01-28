const { User } = require("../models");
const { File } = require("../models");

module.exports = {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ["id", "name", "email", "avatar_id"],
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["name", "filename", "url"]
        }
      ]
    });
    res.json(providers);
  }
};
