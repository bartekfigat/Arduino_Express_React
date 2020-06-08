const { Router } = require("express");
const router = Router();
const { validationResult } = require("express-validator");
const {
  validRegister,
  validLogin,
} = require("../../middleware/inputValidation");
const { userRegister } = require("../../middleware/userRegister");
const { create } = require("../../controllers/userController");
const { createCredentials } = require("../../controllers/sessionsController");
const {
  sendEmailVerification,
  updateAccoutnAfterEmailConfirmation,
} = require("../../controllers/sedGridController");
const User = require("../../models/User");

//Controllers
/* ======== POST  userRegister ======== */
router.post(
  "/register",
  validRegister,
  userRegister,
  async (req, res, next) => {
    const { userEmail } = req.body;
    const emailValid = await User.findOne({ userEmail });

    if (emailValid) {
      res.status(400).json({ error: "Something went wrong" });
    } else {
      try {
        const userResult = await create(req.user);
        const sendEmail = await sendEmailVerification(req.user);

        res.json({
          userResult,
          sendEmail,
        });
      } catch (error) {
        res
          .status(500)
          .json({ error: "You have entered an invalid email or password" });
      }
    }
  }
);
/* ======== POST  userLogin ======== */
router.post("/login", validLogin, async (req, res) => {
  const credentials = req.body;
  const { userEmail, userPassword } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ userEmail });
    const match =
      user && (await bcrypt.compare(userPassword, user.userPassword));

    if (!match) {
      return res
        .status(400)
        .json({ error: "You have entered an invalid email or password" });
    } else if (user.authToken !== null) {
      res.status(401).json({ error: "Please confirm registration by email" });
    } else {
      res.json(await createCredentials(credentials));
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "You have entered an invalid email or password" });
  }
});

/* ======== Get activate  ======== */
router.get("/activate/:token", async (req, res) => {
  const { token } = req.params;
  console.log(token);
  try {
    const registerResult = await updateAccoutnAfterEmailConfirmation(token);
    res.json(registerResult);
  } catch (err) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
