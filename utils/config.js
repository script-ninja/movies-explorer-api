module.exports = {
  PORT:
    process.env.PORT || 3001,

  MONGO_URI:
    process.env.MONGO_URI || 'mongodb://localhost:27017/movies',

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
