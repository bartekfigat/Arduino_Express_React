const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const Port = process.env.PORT || 8080;

//@Rotues Require
const indexRouter = require("./routes/api/index");

//Server
const server = express();

//DB Connection
const db = require("./config/index");
db.dbConnection();

//Middleware functions
const { notFound, errorHandler } = require("./middleware/index");

// set public assets directory
app.use(express.static("public"));

//Middleware
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan("tiny"));
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
server.use(helmet());

// Mount Routes
server.use(indexRouter);

//Errors Handlers
server.use(notFound);
server.use(errorHandler);

server.listen(Port, () => {
  console.log(`Server running on port:${Port}`);
});
