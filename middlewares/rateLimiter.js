const rateLimiter = require('express-rate-limit');
const { ERRORS } = require('../utils/constants');

module.exports = rateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: { message: ERRORS.COMMON.REQUESTS },
});
