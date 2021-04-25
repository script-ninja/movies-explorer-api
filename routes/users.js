const router = require('express').Router();
const { validateProfileUpdate } = require('../middlewares/prevalidation');
const { getUser, updateUser } = require('../controllers/users');

router.route('/me')
  .get(getUser)
  .patch(validateProfileUpdate, updateUser);

module.exports = router;
