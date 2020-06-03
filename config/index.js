require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const { dbURI } = process.env;
const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

module.exports = {
  dbConnection: () => {
    (async () => {
      try {
        const dbConnectec = await mongoose.connect(dbURI, dbOptions);
        if (dbConnectec) {
          console.log("mongoDB connected");
        }
      } catch (err) {
        console.log(`error: ${err}`);
      }
    })();
  },
};
