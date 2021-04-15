const UserModel = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');

function getUser(req, res, next) {
  req.user = { _id: '6077e493b35ef62e548165e' }; // тестовый id
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

function createUser(req, res, next) {
  UserModel.create(req.body)
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
          throw new InternalServerError('Не удалось добавить пользователя');
      }
    })
    .catch(next);
}

module.exports = {
  getUser,
  createUser,
};
