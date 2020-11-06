require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => console.log('MongoDB connected.'));

const apiRouter = require('./components/index/indexAPI');

const app = express();

// middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      blockAllMixedContent: [],
      fontSrc: ["'self'", "https:", "data:"],
      frameAncestors: ["'self'"],
      imgSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      upgradeInsecureRequests: []
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.options('/*', cors());
app.use('/api', cors(), apiRouter);
// redirects on access index
app.get(/\/$/, logger('combined'), (req, res) => {
  return res.redirect('https://ruansenadev.github.io/Portfolio');
});

module.exports = app;
