const CustomError = require('../utils/custom-error.js');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: 'Something went wrong, try again later' });
};

module.exports = errorHandler;
