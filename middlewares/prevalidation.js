const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { JOI_OPTIONS, VALIDATOR_OPTIONS } = require('../utils/config');
const { ERRORS } = require('../utils/constants');

function validateUrl(url, helpers) {
  return validator.isURL(url, VALIDATOR_OPTIONS) ? url : helpers.error('any.invalid');
}

const emailSchema = Joi.string().required().email().messages({
  'any.required': ERRORS.USER.EMAIL.REQUIRED,
  'string.email': ERRORS.USER.EMAIL.INVALID,
  'string.empty': ERRORS.USER.EMAIL.EMPTY,
});

const passwordSchema = Joi.string().required().messages({
  'any.required': ERRORS.USER.PASSWORD.REQUIRED,
  'string.empty': ERRORS.USER.PASSWORD.EMPTY,
});

const nameSchema = Joi.string().min(2).max(30).messages({
  'any.required': ERRORS.USER.NAME.REQUIRED,
  'string.empty': ERRORS.USER.NAME.EMPTY,
  'string.min': ERRORS.USER.NAME.MIN,
  'string.max': ERRORS.USER.NAME.MAX,
});

const movieMongoIdSchema = Joi.object().keys({
  id: Joi.string().required().length(24).hex()
    .messages({
      'any.required': ERRORS.MOVIE.ID.REQUIRED,
      'string.empty': ERRORS.MOVIE.ID.EMPTY,
      'string.length': ERRORS.MOVIE.ID.INVALID,
      'string.hex': ERRORS.MOVIE.ID.INVALID,
    }),
});

const movieSchema = Joi.object().keys({
  country: Joi.string().required().messages({
    'any.required': ERRORS.MOVIE.COUNTRY.REQUIRED,
    'string.empty': ERRORS.MOVIE.COUNTRY.EMPTY,
  }),
  director: Joi.string().required().messages({
    'any.required': ERRORS.MOVIE.DIRECTOR.REQUIRED,
    'string.empty': ERRORS.MOVIE.DIRECTOR.EMPTY,
  }),
  duration: Joi.number().integer().required().messages({
    'any.required': ERRORS.MOVIE.DURATION.REQUIRED,
    'number.empty': ERRORS.MOVIE.DURATION.EMPTY,
    'number.base': ERRORS.MOVIE.DURATION.BASE,
    'number.integer': ERRORS.MOVIE.DURATION.INTEGER,
  }),
  year: Joi.string().required().messages({
    'any.required': ERRORS.MOVIE.YEAR.REQUIRED,
    'string.empty': ERRORS.MOVIE.YEAR.EMPTY,
  }),
  description: Joi.string().required().messages({
    'any.required': ERRORS.MOVIE.DESCRIPTION.REQUIRED,
    'string.empty': ERRORS.MOVIE.DESCRIPTION.EMPTY,
  }),
  image: Joi.string().required().custom(validateUrl).messages({
    'any.invalid': ERRORS.MOVIE.IMAGE.INVALID,
    'any.required': ERRORS.MOVIE.IMAGE.REQUIRED,
    'string.empty': ERRORS.MOVIE.IMAGE.EMPTY,
  }),
  trailer: Joi.string().required().custom(validateUrl).messages({
    'any.invalid': ERRORS.MOVIE.TRAILER.INVALID,
    'any.required': ERRORS.MOVIE.TRAILER.REQUIRED,
    'string.empty': ERRORS.MOVIE.TRAILER.EMPTY,
  }),
  thumbnail: Joi.string().required().custom(validateUrl).messages({
    'any.invalid': ERRORS.MOVIE.THUMBNAIL.INVALID,
    'any.required': ERRORS.MOVIE.THUMBNAIL.REQUIRED,
    'string.empty': ERRORS.MOVIE.THUMBNAIL.EMPTY,
  }),
  // owner: Joi.string().required().length(24).hex()
  //   .messages({
  //     'any.required': ERRORS.MOVIE.OWNER.REQUIRED,
  //     'string.empty': ERRORS.MOVIE.OWNER.EMPTY,
  //     'string.length': ERRORS.MOVIE.OWNER.INVALID,
  //     'string.hex': ERRORS.MOVIE.OWNER.INVALID,
  //   }),
  movieId: Joi.number().required().integer().messages({
    'any.required': ERRORS.MOVIE.MOVIEID.REQUIRED,
    'number.base': ERRORS.MOVIE.MOVIEID.BASE,
    'number.integer': ERRORS.MOVIE.MOVIEID.INTEGER,
  }),
  nameRU: Joi.string().required().messages({
    'any.required': ERRORS.MOVIE.NAMERU.REQUIRED,
    'string.empty': ERRORS.MOVIE.NAMERU.EMPTY,
  }),
  nameEN: Joi.string().required().messages({
    'any.required': ERRORS.MOVIE.NAMEEN.REQUIRED,
    'string.empty': ERRORS.MOVIE.NAMEEN.EMPTY,
  }),
}).messages({
  'object.unknown': '\'{#child}\' - лишнее поле',
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema.required(),
  }),
}, JOI_OPTIONS);

const validateAuthorization = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
  }),
}, JOI_OPTIONS);

const validateProfileUpdate = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({
    email: emailSchema,
    name: nameSchema,
  }),
}, JOI_OPTIONS);

const validateMovie = celebrate({
  body: movieSchema,
}, JOI_OPTIONS);

const validateMovieMongoId = celebrate({
  params: movieMongoIdSchema,
}, JOI_OPTIONS);

module.exports = {
  validateRegistration,
  validateAuthorization,
  validateProfileUpdate,
  validateMovie,
  validateMovieMongoId,
};
