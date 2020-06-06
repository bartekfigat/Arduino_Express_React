const { check, validationResult } = require("express-validator");

const validRegister = [
  check(`userName`, "Name is required").not().isEmpty(),
  check(`userEmail`, "Please fill out a valid email address").isEmail(),
  check(`modelID`, "Model ID is required").not().isEmpty(),
  check(
    `userPassword`,
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

const validLogin = [
  check(`userEmail`, "Plase include valid email").isEmail(),
  check(`userPassword`, "Password*").not().isEmpty(),
];

module.exports = {
  validRegister,
  validLogin,
};
