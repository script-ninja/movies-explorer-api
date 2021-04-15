const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_KEY } = require('../utils/config');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, JWT_KEY);
  } catch (err) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  next();
}

module.exports = auth;
