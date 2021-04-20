const MovieModel = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const { ERRORS } = require('../utils/constants');

function getMovies(req, res, next) {
  MovieModel.find({})
    .orFail(new NotFoundError(ERRORS.MOVIE.COMMON.NO_MOVIES))
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      if (err.status) throw err;
      throw new InternalServerError(ERRORS.MOVIE.COMMON.RECEIVING);
    })
    .catch(next);
}

function createMovie(req, res, next) {
  req.body.owner = req.user._id;

  MovieModel.create(req.body)
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      switch (err.name) {
        case 'ValidationError':
          throw new BadRequestError(ERRORS.MOVIE.COMMON.WRONG_DATA);
        case 'MongoError':
          if (err.code === 11000) {
            throw new ConflictError(ERRORS.MOVIE.COMMON.EXISTS);
          }
          break;
        default:
      }
      throw new InternalServerError(ERRORS.MOVIE.COMMON.NOT_SAVED);
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  MovieModel.findOne({ movieId: req.params.id })
    .orFail(new NotFoundError(ERRORS.MOVIE.COMMON.NOT_FOUND))
    .then((movie) => {
      if (String(movie.owner) !== String(req.user._id)) {
        throw new ForbiddenError(ERRORS.MOVIE.COMMON.WRONG_OWNER);
      }
      return MovieModel.findByIdAndRemove(movie._id).select('-owner');
    })
    .then((deletedMovie) => {
      res.status(200).send(deletedMovie);
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
