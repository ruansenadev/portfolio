const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, maxlength: 120, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  icon: { type: String, required: true, default: 'article' },
  markdown: { type: String, required: true },
  description: { type: String, maxlength: 220 },
  modified: { type: Date },
  labels: [{type: String, required: true, minlength: 2}]
})

module.exports = mongoose.model('Post', postSchema)
