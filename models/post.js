const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, maxlength: 120, required: true, unique: true },
  description: { type: String, maxlength: 220 },
  date: { type: Date, required: true, default: Date.now },
  modified: { type: Date },
  markdown: { type: String, required: true }
})

postSchema.pre('updateOne', function (next) {
  this.modified = new Date()
  next()
})

module.exports = mongoose.model('Post', postSchema)
