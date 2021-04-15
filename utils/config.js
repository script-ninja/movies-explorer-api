module.exports = {
  PORT:
    process.env.PORT || 3001,

  NODE_ENV:
    process.env.NODE_ENV || 'dev',

  JWT_KEY:
    (process.env.NODE_ENV === 'production')
      ? process.env.JWT_KEY
      : 'jwt-key',

  JWT_OPTIONS: {
    expiresIn: '7d',
  },

  SALT_ROUNDS: 10,

  MONGO_URI:
    (process.env.NODE_ENV === 'production')
      ? process.env.MONGO_URI
      : 'mongodb://localhost:27017/moviesdb',

  MONGO_OPTIONS: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },

  CORS_OPTIONS: {
    origin: [
      'http://localhost:3000',
      'http://films.nomoredomains.icu',
      'https://films.nomoredomains.icu',
    ],
  },
};
