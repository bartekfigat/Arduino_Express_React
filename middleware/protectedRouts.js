require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");
const { secret } = process.env;

module.exports.protectedRoutes = (req, res, next) => {
  const token = req.headers["access-token"];

  // decode token
  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    // verifies secret and checks if the token
    const decode = jwt.verify(token, secret);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({ err: "Token not valid" });
    throw Error(error);
  }
};
