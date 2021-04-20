const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { ERRORS } = require('../utils/constants');

router.use('/', authRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use(() => {
  throw new NotFoundError(ERRORS.COMMON.NOT_FOUND);
});

module.exports = router;
