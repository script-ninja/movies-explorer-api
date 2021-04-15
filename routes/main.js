const router = require('express').Router();
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter);
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
