const router = require('express').Router();
const { validateMovie, validateMovieId } = require('../middlewares/prevalidation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.route('/')
  .get(getMovies)
  .post(validateMovie, createMovie);

router.route('/:id')
  .delete(validateMovieId, deleteMovie);

module.exports = router;
