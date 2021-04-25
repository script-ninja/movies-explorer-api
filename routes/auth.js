const router = require('express').Router();
const { validateAuthorization, validateRegistration } = require('../middlewares/prevalidation');
const { login, createUser } = require('../controllers/users');

router.route('/signin')
  .post(validateAuthorization, login);

router.route('/signup')
  .post(validateRegistration, createUser);

module.exports = router;
