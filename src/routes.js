const { Router } = require("express");
const multer = require("multer");
const user = require("./controllers/user");
const provider = require("./controllers/provider");
const session = require("./controllers/session");
const file = require("./controllers/file");
const auth = require("./middlewares/auth");
const multerConfig = require("./config/multer");

const routes = Router();

const upload = multer(multerConfig);

routes.post("/users", user.store);
routes.post("/sessions", session.store);

routes.use(auth);

routes.post("/files", upload.single("file"), file.store);

routes.get("/users", user.index);
routes.put("/users", user.update);

routes.get("/providers", provider.index);

module.exports = routes;
