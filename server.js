const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const Port = process.env.PORT || 8080;

//Server
const server = express();

//DB Connection
const db = require("./config/index");
db.dbConnection();

//@Rotues Require
const indexRouter = require("./routes/api/index");
//Middleware functions
const { notFound, errorHandler } = require("./middleware/index");

// set public assets directory
server.use(express.static("public"));
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("tiny"));
server.use(helmet());

// Mount Routes
server.use("/api/user", indexRouter);

//Errors Handlers
server.use(notFound);
server.use(errorHandler);

server.listen(Port, () => {
  console.log(`Server running on port:${Port}`);
});
