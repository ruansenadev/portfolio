const mongoose = require('mongoose')
const slugify = require('slug')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  seq: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['Protótipagem', 'Desenvolvimento', 'Encerrado', 'Finalizado'] },
  description: { type: String, required: true },
  thumbnailPath: { type: String },
  slug: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  url: { type: String, required: true },
  homepage: { type: String },
  keywords: [{ type: String, required: true }]
})

projectSchema.index({ reference: 1, homepage: 1 }, { unique: true })

projectSchema.pre('validate', function (next) {
  this.slug = slugify(this.name)
  next()
})
projectSchema.pre('updateOne', function (next) {
  this._update.slug = slugify(this._update.name)
  next()
})

module.exports = mongoose.model('Project', projectSchema)
