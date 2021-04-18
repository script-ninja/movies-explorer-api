const { celebrate, Joi } = require('celebrate');
const { ERRORS } = require('../utils/constants');

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

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema.required(),
  }),
});

const validateAuthorization = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
  }),
});

const validateProfileUpdate = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    name: nameSchema,
  }),
});

module.exports = {
  validateRegistration,
  validateAuthorization,
  validateProfileUpdate,
};
