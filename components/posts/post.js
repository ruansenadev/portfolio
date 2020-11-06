const { Schema, model } = require('mongoose');
const leanVirtuals = require('mongoose-lean-virtuals');
const slugify = require('slug');
const readingTime = require('reading-time');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Bahia').locale('pt-br');

const schema = new Schema({
  title: { type: String, maxlength: 120, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  thumbnailPath: { type: String },
  icon: { type: String, required: true, default: 'article' },
  markdown: { type: String, required: true },
  description: { type: String, maxlength: 220 },
  modified: { type: Date },
  labels: [{ type: String, required: true, minlength: 2 }]
});

schema.virtual('reading')
  .get(function () {
    return readingTime(this.markdown);
  });
schema.virtual('date_formated')
  .get(function () {
    const date = moment(this.date);
    return { relative: date.fromNow(), locale: date.format('L') };
  });

schema.plugin(leanVirtuals);

schema.pre('validate', function (next) {
  this.slug = slugify(this.title);
  next();
})
schema.pre('updateOne', function (next) {
  this._update.slug = slugify(this._update.title);
  next();
});

module.exports = model('Post', schema);
