const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getUser } = require('../controllers/users');

router.route('/me')
  .get(getUser);

module.exports = router;
