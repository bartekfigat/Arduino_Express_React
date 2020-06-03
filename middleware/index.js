const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.ststusCode === 200 ? 500 : res.ststusCode;
  res.status(statusCode);
  res.json({
    msg: error.message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
