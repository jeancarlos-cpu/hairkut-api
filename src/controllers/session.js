const jwt = require("jsonwebtoken");
const yup = require("yup");
const jwtSecret = require("../config/jwt");
const { User } = require("../models");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required()
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: "bad formated" });

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "user not found" });
    // const match = await bcrypt.compare(password, user.password);
    const match = await user.checkPassword(password);

    if (!match) return res.status(400).json({ error: "incorrect password" });

    const { id, name } = user;

    return res.json({
      user: { id, email, name },
      token: jwt.sign({ id }, jwtSecret)
    });
  }
};
