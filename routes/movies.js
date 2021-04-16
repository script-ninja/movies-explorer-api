const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.route('/')
  .get(getMovies)
  .post(createMovie);

router.route('/:id')
  .delete(deleteMovie);

module.exports = router;
