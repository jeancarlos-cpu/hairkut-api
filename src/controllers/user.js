const { User } = require("../models");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  },

  async show(req, res) {},

  async store(req, res) {
    const match = await User.findOne({ where: { email: req.body.email } });
    if (match) return res.status(400).json({ error: "user already exists." });
    const { id, name, email, provider, password } = await User.create(req.body);
    res.json({ id, name, email, provider, password });
  },

  async update(req, res) {},

  async destroy(req, res) {}
};
