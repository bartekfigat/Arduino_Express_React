const { Router } = require("express");
const router = Router();
const { validationResult } = require("express-validator");
const { validRegister } = require("../../middleware/inputValidation");
const { userRegister } = require("../../middleware/userRegister");
const { create } = require("../../controllers/userController");
const { update } = require("../../controllers/userController");
const {
  sendEmailVerification,
  updateAccoutnAfterEmailConfirmation,
} = require("../../controllers/sedGridController");
const User = require("../../models/User");
//Controllers
const { indexRouter } = require("../../controllers/index");

/* ======== GET index ======== */

/* ======== POST  userRegister ======== */
router.post(
  "/register",
  validRegister,
  userRegister,
  async (req, res, next) => {
    const { email } = req.body;
    const emailValid = await User.findOne({ userEmail: email });

    if (emailValid) {
      res.status(400).json({ error: "Something went wrong" });
    } else {
      try {
        const userResult = await create(req.user);
        const sendEmail = await sendEmailVerification(req.user);

        console.log(`userResult  :${userResult}`);

        res.json({
          userResult,
          sendEmail,
        });
      } catch {
        console.log(error);
        res
          .status(500)
          .json({ error: "You have entered an invalid email or password" });
      }
    }
  }
);
/* ======== Get activate  ======== */

router.get("/activate/:token", async (req, res) => {
  const { token } = req.param;
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
