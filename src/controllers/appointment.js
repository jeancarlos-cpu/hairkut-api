const { Appointment } = require("../models");
const { User } = require("../models");
const { File } = require("../models");
const { startOfHour, isBefore, parseISO } = require("date-fns");
const yup = require("yup");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: { user_id: req.id, canceled_at: null },
      order: ["date"],
      attributes: ["id", "date"],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "name"],
          include: [
            {
              model: File,
              as: "avatar",
              attributes: ["id", "filename", "url"]
            }
          ]
        }
      ]
    });
    return res.json(appointments);
  },
  async store(req, res) {
    const schema = yup.object().shape({
      provider_id: yup.number().required(),
      date: yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "invalid format" });
    }

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    });

    if (!isProvider) {
      return res.status(401).json({ error: "Provider is not a user provider" });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: "the appointment date must be in the future." });
    }

    const isNotAvaliable = await Appointment.findOne({
      where: {
        provider_id,
        date: hourStart,
        canceled_at: null
      }
    });

    if (isNotAvaliable) {
      return res.json({ error: "date unavaliable" });
    }

    const appointment = await Appointment.create({
      user_id: req.id,
      provider_id,
      date: hourStart
    });

    return res.json(appointment);
  }
};
