const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Bucketlist Backend Server</h1>");
});

module.exports = server;
