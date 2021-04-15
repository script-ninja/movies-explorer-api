const MovieModel = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');

function getMovie(req, res, next) {
  MovieModel.findOne({ movieId: req.params.id })
    .orFail(new NotFoundError('Фильм не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.status) throw err;
      if (err.name === 'CastError') throw new BadRequestError('Некорректный ID фильма');
      throw new InternalServerError('Не удалось получить фильм');
    })
    .catch(next);
}

function createMovie(req, res, next) {
  MovieModel.create(req.body)
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          throw new BadRequestError(err.message);
        case 'MongoError':
          if (err.code === 11000) {
            throw new ConflictError('Указанный фильм уже сохранен');
          }
          break;
        default:
          throw new InternalServerError('Не удалось сохранить фильм');
      }
    })
    .catch(next);
}

module.exports = {
  getMovie,
  createMovie,
};
