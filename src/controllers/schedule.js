const { User } = require("../models");

module.exports = {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.id, proviver: true }
    });
    if (!isProvider) {
      return res.status(401).json({ error: "User is not a provider." });
    }

    const { date = new Date() } = req.query;

    const appointments = await appointments.findAll({
      where: {
        provider_id: req.id,
        canceled_at: null,
        date: {}
      }
    });

    return res.json();
  }
};
