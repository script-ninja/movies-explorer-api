module.exports = {
  PORT:
    process.env.PORT || 3000,

  NODE_ENV:
    process.env.NODE_ENV || 'dev',

  JWT: {
    KEY: (process.env.NODE_ENV === 'production')
      ? process.env.JWT_KEY
      : 'jwt-key',

    OPTIONS: {
      expiresIn: '7d',
    },
  },

  SALT_ROUNDS: 10,

  VALIDATOR_OPTIONS: {
    protocols: ['http', 'https'],
  },

  JOI_OPTIONS: {
    abortEarly: false,
  },

  MONGO: {
    URI: (process.env.NODE_ENV === 'production')
      ? process.env.MONGO_URI
      : 'mongodb://localhost:27017/moviesdb',

    OPTIONS: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  },

  CORS_OPTIONS: {
    origin: [
      'http://localhost:3000',
      'http://films.nomoredomains.icu',
      'https://films.nomoredomains.icu',
    ],
  },
};
