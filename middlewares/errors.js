const { isCelebrateError } = require('celebrate');
const { ERRORS } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  let { status, message } = err;

  if (isCelebrateError(err)) {
    status = 400;
    const messages = [];
    err.details.forEach((value) => messages.push(value.message));
    message = messages.join('. ');
  }

  if (!status) {
    status = 500;
    message = ERRORS.COMMON.INTERNAL;
  }

  res.status(status).send({ message });

  next();
};
