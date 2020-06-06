const { index } = require("../controllers/userController");

const indexRouter = async (req, res) => {
  res.json(await index());
};

module.exports = {
  indexRouter,
};
