/** @format */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mainRouter = require("./routes");
const passport = require("passport");
const cookieParser = require("cookie-parser");

dotenv.config();

const database = require("./db");
const http = require("http");
const { Http2ServerRequest } = require("http2");

const port = process.env.PORT || 9001;

const app = express();

// const httpServer = http.createServer(app);
// const io = require("socket.io")(httpServer);
// module.exports = io;
// const SocketManager = require("./socket.js");
// io.on("connection", SocketManager);

const whitelist = [
  "http://localhost:3000",
  "http://localhost:300/login",
  "http://localhost:9001",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS issues"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use("/potd", mainRouter);
database.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log("port yeeting", port, "monke's");
  });
});
