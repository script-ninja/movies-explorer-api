const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT, SALT_ROUNDS } = require('../utils/config');

// === регистрация и авторизация === //
function createUser(req, res, next) {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => {
      req.body.password = hash;
      return UserModel.create(req.body);
    })
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          throw new BadRequestError(err.message);
        case 'MongoError':
          if (err.code === 11000) {
            throw new ConflictError('Указанный email зарегистрирован');
          }
          break;
        default:
      }
      throw new InternalServerError('Не удалось зарегистрировать');
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Неправильные почта или пароль');

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnauthorizedError('Неправильные почта или пароль');
          res.status(200).send({
            token: jwt.sign({ _id: user._id }, JWT.KEY, JWT.OPTIONS),
          });
        });
    })
    .catch(next);
}
// ================================= //

function getUser(req, res, next) {
  UserModel.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.status) throw err;
      if (err.name === 'CastError') throw new BadRequestError('Некорректный ID пользователя');
      throw new InternalServerError('Не удалось получить пользователя');
    })
    .catch(next);
}

function updateUser(req, res, next) {
  UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          throw new BadRequestError(err.message);
        case 'CastError':
          throw new BadRequestError('Некорректный ID пользователя');
        default:
          if (err.status) throw err;
      }
      throw new InternalServerError('Не удалось обновить профиль');
    })
    .catch(next);
}

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
};
