const express = require("express");
const cors = require("cors");
const server = express();

const configureRoutes = require("../user/userRoute");

server.use(express.json(), cors());
configureRoutes(server);

module.exports = server;
