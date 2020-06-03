const { Router } = require("express");
const router = Router();

//Controllers
const { indexRouter } = require("../../controllers/index");

/* GET index */
router.get("/", indexRouter);

module.exports = router;
