const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  seq: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['Prototipagem', 'Desenvolvimento', 'Encerrado', 'Finalizado'] },
  description: { type: String, required: true },
  thumbnailPath: { type: String },
  slug: { type: String, required: true },
  technologies: [String],
  url: { type: String },
  homepage: { type: String },
  keywords: [String]
})

projectSchema.index({ reference: 1, homepage: 1 }, { unique: true })

module.exports = mongoose.model('Project', projectSchema)
