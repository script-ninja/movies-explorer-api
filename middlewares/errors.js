module.exports = (err, req, res, next) => {
  const message = err.status ? err.message : 'Внутренняя ошибка сервера';

  res.status(err.status || 500).send({ message });

  next();
};
