const indexRouter = async (req, res) => {
  res.json({
    msg: "Hello from index router",
  });
};

module.exports = {
  indexRouter,
};
