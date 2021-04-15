const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

router.route('/signin')
  .post(login);

router.route('/signup')
  .post(createUser);

module.exports = router;
