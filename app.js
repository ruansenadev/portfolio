require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))
db.once('open', () => console.log('MongoDB connected.'))

const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/users', usersRouter);

module.exports = app;
