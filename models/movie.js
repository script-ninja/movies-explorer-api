const mongoose = require('mongoose');
const validator = require('validator');
const { VALIDATOR_OPTIONS } = require('../utils/config');
const { ERRORS } = require('../utils/constants');

const schema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, ERRORS.MOVIE.COUNTRY.REQUIRED],
  },
  director: {
    type: String,
    required: [true, ERRORS.MOVIE.DIRECTOR.REQUIRED],
  },
  duration: {
    type: Number,
    required: [true, ERRORS.MOVIE.DURATION.REQUIRED],
  },
  year: {
    type: String,
    required: [true, ERRORS.MOVIE.YEAR.REQUIRED],
  },
  description: {
    type: String,
    required: [true, ERRORS.MOVIE.DESCRIPTION.REQUIRED],
  },
  image: {
    type: String,
    required: [true, ERRORS.MOVIE.IMAGE.REQUIRED],
    validate: {
      validator(url) {
        return validator.isURL(url, VALIDATOR_OPTIONS);
      },
      message: ERRORS.MOVIE.IMAGE.INVALID,
    },
  },
  trailer: {
    type: String,
    required: [true, ERRORS.MOVIE.TRAILER.REQUIRED],
    validate: {
      validator(url) {
        return validator.isURL(url, VALIDATOR_OPTIONS);
      },
      message: ERRORS.MOVIE.TRAILER.INVALID,
    },
  },
  thumbnail: {
    type: String,
    required: [true, ERRORS.MOVIE.THUMBNAIL.REQUIRED],
    validate: {
      validator(url) {
        return validator.isURL(url, VALIDATOR_OPTIONS);
      },
      message: ERRORS.MOVIE.THUMBNAIL.INVALID,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, ERRORS.MOVIE.OWNER.REQUIRED],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, ERRORS.MOVIE.MOVIEID.REQUIRED],
  },
  nameRU: {
    type: String,
    required: [true, ERRORS.MOVIE.NAMERU.REQUIRED],
  },
  nameEN: {
    type: String,
    required: [true, ERRORS.MOVIE.NAMEEN.REQUIRED],
  },
});

module.exports = mongoose.model('movie', schema);
