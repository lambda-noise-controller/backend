const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json(), cors());

module.exports = server;
