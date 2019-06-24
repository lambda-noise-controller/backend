const express = require("express");
const cors = require("cors");
const server = express();

const userRoute = require("../user/userRoute");

server.use(express.json(), cors());
server.use("/api/users", userRoute);

module.exports = server;
