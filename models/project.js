const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  seq: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['Protótipagem', 'Desenvolvimento', 'Encerrado', 'Finalizado'] },
  description: { type: String, required: true, maxlength: 330 },
  overview: { type: String },
  thumbnailPath: { type: String },
  technologies: [{ type: String, required: true }],
  url: { type: String, required: true },
  homepage: { type: String },
  keywords: [{ type: String, required: true }]
})

projectSchema.index({ reference: 1, homepage: 1 }, { unique: true })

module.exports = mongoose.model('Project', projectSchema)
