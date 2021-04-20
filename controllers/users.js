const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT, SALT_ROUNDS } = require('../utils/config');
const { ERRORS } = require('../utils/constants');

// регистрация пользователя
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
          throw new BadRequestError(ERRORS.USER.COMMON.WRONG_DATA);
        case 'MongoError':
          if (err.code === 11000) {
            throw new ConflictError(ERRORS.USER.EMAIL.EXISTS);
          }
          break;
        default:
      }
      throw new InternalServerError(ERRORS.USER.REGISTRATION.FAILED);
    })
    .catch(next);
}

// авторизация пользователя
function login(req, res, next) {
  const { email, password } = req.body;
  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError(ERRORS.USER.AUTHENTICATION.FAILED);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnauthorizedError(ERRORS.USER.AUTHENTICATION.FAILED);
          res.status(200).send({
            token: jwt.sign({ _id: user._id }, JWT.KEY, JWT.OPTIONS),
          });
        });
    })
    .catch(next);
}

function getUser(req, res, next) {
  UserModel.findById(req.user._id)
    .orFail(new NotFoundError(ERRORS.USER.COMMON.NOT_FOUND))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.status) throw err;
      if (err.name === 'CastError') throw new BadRequestError(ERRORS.USER.COMMON.WRONG_ID);
      throw new InternalServerError(ERRORS.USER.COMMON.RECEIVING);
    })
    .catch(next);
}

function updateUser(req, res, next) {
  UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError(ERRORS.USER.COMMON.NOT_FOUND))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          throw new BadRequestError(ERRORS.USER.COMMON.WRONG_DATA);
        case 'CastError':
          throw new BadRequestError(ERRORS.USER.COMMON.WRONG_ID);
        case 'MongoError':
          if (err.code === 11000) {
            throw new ConflictError(ERRORS.USER.EMAIL.EXISTS);
          }
          break;
        default:
          if (err.status) throw err;
      }
      throw new InternalServerError(ERRORS.USER.COMMON.UPDATE);
    })
    .catch(next);
}

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
};
