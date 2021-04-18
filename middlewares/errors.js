const { isCelebrateError } = require('celebrate');

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
    message = 'Внутренняя ошибка сервера';
  }

  res.status(status).send({ message });

  next();
};
