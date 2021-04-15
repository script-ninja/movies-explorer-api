const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getUser, createUser } = require('../controllers/users');

router.route('/')
  .post(createUser);

router.route('/me')
  .get(getUser);

module.exports = router;
