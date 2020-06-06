const { Router } = require("express");
const router = Router();
const { validRegister } = require("../../middleware/inputValidation");
const {
  userRegister,
  createUserModel,
} = require("../../middleware/userRegister");
const { validationResult } = require("express-validator");
const { update } = require("../../controllers/userController");
const {
  sendEmailVerification,
  updateAccoutnAfterEmailConfirmation,
} = require("../../controllers/sedGridController");

//Controllers
const { indexRouter } = require("../../controllers/index");

/* ======== GET index ======== */
router.get("/", indexRouter);

/* ======== POST  userRegister ======== */
router.post(
  "/register",
  validRegister,
  userRegister,
  async (req, res, next) => {
    try {
      const userResult = await createUserModel(req.user);
      const sendEmail = await sendEmailVerification(req.user);

      console.log(userResult);

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
);
/* ======== Get activate  ======== */

router.get("/activate/:token", async (req, res) => {
  try {
    const registerResult = await update(req.params.token);
    res.json(registerResult);
  } catch (err) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
