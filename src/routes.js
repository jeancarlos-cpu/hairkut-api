const { Router } = require("express");
const user = require("./controllers/user");
const session = require("./controllers/session");
const auth = require("./middlewares/auth");
const routes = Router();

routes.post("/users", user.store);
routes.post("/sessions", session.store);

routes.use(auth);
routes.get("/users", user.index);

module.exports = routes;
