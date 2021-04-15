const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Не указан email'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Не указан пароль'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Не указано имя'],
    minlength: [2, 'Минимальная длина имени 2-а символа'],
    maxlength: [30, 'Максимальная длина имени 30-ть символов'],
  },
});

module.exports = mongoose.model('user', schema);
