require("dotenv").config({ path: ".env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

const { secret } = process.env;

const userRegister = async (req, res, next) => {
  console.log(req.body);
  try {
    const { userName, userEmail, userPassword, modelID } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    if (!userPassword) {
      res.status(400).json({ error: "Something went wrong" });
    } else {
      const salt = 10;
      const hash = await bcrypt.hash(userPassword, salt);
      req.user = new User({
        userName,
        userEmail,
        userPassword: hash,
        modelID,
        authToken: jwt.sign(
          {
            data: new Date().getTime(),
          },
          secret
        ),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createUserModel = async (user = new User()) => {
  if (!(user instanceof User)) return Error("User object required.");
  try {
    return await User.create(user);
  } catch (error) {
    console.log(`error  : ${error}`);
  }
};

module.exports = {
  userRegister,
  createUserModel,
};
