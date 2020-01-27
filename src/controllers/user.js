const jwt = require("jsonwebtoken");
const yup = require("yup");
const { User } = require("../models");
const jwtSecret = require("../config/jwt");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  },

  async show(req, res) {},

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(8)
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: "bad formated" });

    const match = await User.findOne({ where: { email: req.body.email } });
    if (match) return res.status(400).json({ error: "user already exists." });
    const { id, name, email, provider } = await User.create(req.body);

    res.json({
      user: { id, name, email, provider },
      token: jwt.sign({ id }, jwtSecret)
    });
  },

  async update(req, res) {
    const { email, oldPassword, password } = req.body;

    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(8),
      password: yup
        .string()
        .min(8)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: yup
        .string()
        .when("password", (password, field) =>
          password ? field.required().oneOf([yup.ref("password")]) : field
        )
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: "bad formated" });

    const user = await User.findByPk(req.id);
    if (email && email !== user.email) {
      const match = await User.findOne({ where: { email: req.body.email } });
      if (match) return res.status(400).json({ error: "user already exists." });
    }

    if (password && !oldPassword)
      return res.status(400).json({ error: "could not get old password" });

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(400).json({ error: "incorrect password" });

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email: email || user.email, provider });
  },

  async destroy(req, res) {}
};
