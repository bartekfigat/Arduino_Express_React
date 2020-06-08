require("dotenv").config({ path: ".env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { secret } = process.env;

const createCredentials = async (credentials) => {
  const { userEmail, userPassword } = credentials;
  try {
    const user = await User.findOne({ userEmail });

    const match = await bcrypt.compare(userPassword, user.userPassword);
    if (match)
      return {
        sessionToken: jwt.sign(
          {
            data: user._id,
          },
          secret
        ),
        id: user._id,
      };
    return null;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { createCredentials };
