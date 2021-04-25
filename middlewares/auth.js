const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT } = require('../utils/config');
const { ERRORS } = require('../utils/constants');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(ERRORS.USER.AUTHORIZATION.REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, JWT.KEY);
  } catch (err) {
    throw new UnauthorizedError(ERRORS.USER.AUTHORIZATION.FAILED);
  }

  next();
}

module.exports = auth;
