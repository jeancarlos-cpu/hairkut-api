const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const jwtSecret = require("../config/jwt");

module.exports = async function(req, res, next) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { id } = await promisify(jwt.verify)(token, jwtSecret);
    req.id = id;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};
