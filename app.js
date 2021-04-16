require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./routes/main');
const errors = require('./middlewares/errors');
const {
  PORT, MONGO, CORS_OPTIONS,
} = require('./utils/config');

const app = express();

mongoose.connect(MONGO.URI, MONGO.OPTIONS);

app.use(cors(CORS_OPTIONS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errors);

app.listen(PORT, () => {
  console.log('App is listening on port', PORT);
});
