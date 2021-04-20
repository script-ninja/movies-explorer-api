const mongoose = require('mongoose');
const validator = require('validator');
const { ERRORS } = require('../utils/constants');

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, ERRORS.USER.EMAIL.REQUIRED],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: ERRORS.USER.EMAIL.INVALID,
    },
  },
  password: {
    type: String,
    required: [true, ERRORS.USER.PASSWORD.REQUIRED],
    select: false,
  },
  name: {
    type: String,
    required: [true, ERRORS.USER.NAME.REQUIRED],
    minlength: [2, ERRORS.USER.NAME.MIN],
    maxlength: [30, ERRORS.USER.NAME.MAX],
  },
});

module.exports = mongoose.model('user', schema);
