require('dotenv').config()
const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))
db.once('open', () => console.log('MongoDB connected.'))

const projectsRouter = require('./routes/projects')
const postsRouter = require('./routes/posts')
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')

const app = express()

app.use(logger('dev'))
app.use(helmet({ contentSecurityPolicy: {
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
}}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.options('*', cors())
app.use('/api', cors())
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/posts', postsRouter)

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message || 'Erro no Servidor' })
});

module.exports = app;
