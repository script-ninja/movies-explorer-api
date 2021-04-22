const router = require('express').Router();
const { validateMovie, validateMovieMongoId } = require('../middlewares/prevalidation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.route('/')
  .get(getMovies)
  .post(validateMovie, createMovie);

router.route('/:id')
  .delete(validateMovieMongoId, deleteMovie);

module.exports = router;
