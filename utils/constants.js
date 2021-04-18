const ERRORS = {
  USER: {
    EMAIL: {
      EMPTY: 'Не указан email-адрес',
      INVALID: 'Невалидный email-адрес',
      REQUIRED: 'Email - обязательное поле',
    },
    PASSWORD: {
      EMPTY: 'Пароль не указан',
      REQUIRED: 'Пароль - обязательное поле',
    },
    NAME: {
      MIN: 'Длина имени не менее 2-х символов',
      MAX: 'Длина имени не более 30-ти символов',
      EMPTY: 'Имя не указано',
      REQUIRED: 'Имя - обязательное поле',
    },
  },
};

module.exports = { ERRORS };
