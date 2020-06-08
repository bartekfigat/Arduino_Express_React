require("dotenv").config({ path: ".env" });
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { secret } = process.env;

sgMail.setApiKey(process.env.sengrind_api_key);

const sendEmailVerification = async (user = new User()) => {
  if (!(user instanceof User)) return Error("User object required.");

  const { userEmail, authToken } = user;
  const msg = {
    to: `${userEmail}`,
    from: "test@test.com",
    subject: `Hello thank you for registering.`,
    text: " Node.js",
    html: `Hello.
		Thank you for registering at localhost Please click the link below to complete yor activation
		<a href='http://localhost:3000/activate/${authToken}'>activate link</a>`,
  };

  try {
    const status = await sgMail.send(msg);

    await user.updateOne({
      isAuthenticated: false,
    });
    return status;
  } catch (error) {
    console.log(error);
  }
};

const updateAccoutnAfterEmailConfirmation = async (token = "") => {
  try {
    const user = await User.findOne({ authToken: token });
    console.log(user);
    const decoded = jwt.verify(token, secret);

    const msg = {
      to: `${user.userEmail}`,
      from: "test@test.com",
      subject: `Hello Account Activated.`,
      text: " Node.js",
      html: `Your account has benn successfully activated`,
    };
    sgMail.send(msg);

    const userUpdate = await user.updateOne({
      authToken: null,
      isAuthenticated: true,
    });

    return userUpdate;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmailVerification,
  updateAccoutnAfterEmailConfirmation,
};
