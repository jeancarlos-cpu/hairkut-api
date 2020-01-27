const { Router } = require("express");
const user = require("./controllers/user");
const routes = Router();

routes.post("/users", user.store);
routes.get("/users", user.index);

module.exports = routes;
