const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  let { status, message } = err;

  if (isCelebrateError(err)) {
    status = 400;
    message = err.details.get('body').message;
  }

  if (!status) {
    status = 500;
    message = 'Внутренняя ошибка сервера';
  }

  res.status(status).send({ message });

  next();
};
