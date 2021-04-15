const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getMovie, createMovie } = require('../controllers/movies');

router.route('/')
  .post(createMovie);

router.route('/:id')
  .get(getMovie);

module.exports = router;
