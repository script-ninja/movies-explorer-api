const MovieModel = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const { ERRORS } = require('../utils/constants');

function getMovies(req, res, next) {
  MovieModel.find({ owner: req.user._id })
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

  MovieModel.findOne({ owner: req.body.owner, movieId: req.body.movieId })
    .then((movie) => {
      if (movie) throw new ConflictError(ERRORS.MOVIE.COMMON.EXISTS);
      return MovieModel.create(req.body);
    })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.status) throw err;
      if (err.name === 'ValidationError') {
        throw new BadRequestError(ERRORS.MOVIE.COMMON.WRONG_DATA);
      }
      throw new InternalServerError(ERRORS.MOVIE.COMMON.NOT_SAVED);
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  MovieModel.findById(req.params.id)
    .orFail(new NotFoundError(ERRORS.MOVIE.COMMON.NOT_FOUND))
    .then((movie) => {
      if (String(movie.owner) !== String(req.user._id)) {
        throw new ForbiddenError(ERRORS.MOVIE.COMMON.WRONG_OWNER);
      }
      return movie.remove();
    })
    .then((deletedMovie) => {
      res.status(200).send(deletedMovie);
    })
    .catch((err) => {
      if (err.status) throw err;
      if (err.name === 'CastError') {
        throw new BadRequestError(ERRORS.MOVIE.COMMON.WRONG_ID);
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError(ERRORS.MOVIE.COMMON.WRONG_DATA);
      }
      throw new InternalServerError(ERRORS.MOVIE.COMMON.NOT_DELETED);
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
