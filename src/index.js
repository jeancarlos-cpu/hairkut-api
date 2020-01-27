const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.get("/", (req, res) => res.send("aaaaa"));
app.use(routes);

app.listen(4000);
