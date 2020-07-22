require('dotenv').config()
const Counter = require('./models/counter')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

async function createCounter(name) {
  const counter = new Counter({
    _id: name,
    seq: 0
  })
  return counter.save()
}

createCounter('Project')
.then(console.log)
.catch(console.error)
.finally(() => {
  mongoose.connection.close()
})
