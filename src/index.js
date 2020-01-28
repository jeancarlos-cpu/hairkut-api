const express = require("express");
const routes = require("./routes");
const { resolve } = require("path");

const app = express();

app.use(express.json());

app.use("/files", express.static(resolve(__dirname, "..", "tmp", "uploads")));

app.use(routes);

app.listen(4000);
