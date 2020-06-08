require("dotenv").config({ path: ".env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const salt = 10;
const { secret } = process.env;

const userRegister = async (req, res, next) => {
  const { userName, userEmail, userPassword, modelID } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({ errors: errors.array() });
  }

  if (!userPassword) {
    res.status(400).json({ error: "Something went wrong" });
  } else {
    const hash = await bcrypt.hash(userPassword, salt);
    req.user = new User({
      userName,
      userEmail,
      userPassword: hash,
      modelID,
      authToken: jwt.sign(
        {
          iat: new Date().getTime(),
        },
        `${secret}`
      ),
    });
    await next();
  }
};

module.exports = {
  userRegister,
};
