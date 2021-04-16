const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

router.route('/me')
  .get(getUser)
  .patch(updateUser);

module.exports = router;
