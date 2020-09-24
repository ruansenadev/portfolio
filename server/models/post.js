const mongoose = require('mongoose')
const slugify = require('slug')
const readingTime = require('reading-time')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Bahia').locale('pt-br')
const leanVirtuals = require('mongoose-lean-virtuals')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, maxlength: 120, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  thumbnailPath: { type: String },
  icon: { type: String, required: true, default: 'article' },
  markdown: { type: String, required: true },
  description: { type: String, maxlength: 220 },
  modified: { type: Date },
  labels: [{ type: String, required: true, minlength: 2 }]
})

postSchema.virtual('reading')
  .get(function () {
    const read = readingTime(this.markdown)
    read.text = `~ ${read.text.split(' read')[0]}`
    return read
  })

postSchema.virtual('date_formated')
  .get(function () {
    const date = moment(this.date)
    return { relative: date.fromNow(), locale: date.format('L') }
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
