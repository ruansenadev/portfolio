const mongoose = require('mongoose')
const slugify = require('slug')
const readingTime = require('reading-time')
const leanVirtuals = require('mongoose-lean-virtuals')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, maxlength: 120, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  icon: { type: String, required: true, default: 'article' },
  markdown: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, maxlength: 220 },
  modified: { type: Date },
  labels: [{ type: String, required: true, minlength: 2 }]
})

postSchema.virtual('reading')
  .get(function () {
    return readingTime(this.markdown)
  })

postSchema.plugin(leanVirtuals)

postSchema.pre('validate', function (next) {
  this.slug = slugify(this.title)
  next()
})
postSchema.pre('updateOne', function (next) {
  this._update.slug = slugify(this._update.title)
  next()
})

module.exports = mongoose.model('Post', postSchema)
